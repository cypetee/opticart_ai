// ai-filter.js — OpenRouter AI filtering + rule-based fallback for OptiCart

const AIFilter = (() => {
  const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
  const MODEL = 'openai/gpt-4o-mini';

  // ─── Rule-based fallback ──────────────────────────────────────────────────

  function ruleScore(item, profile) {
    const pref = profile.productPreference || 'value';
    const fallbackOrganic = profile.organicFallback ?? false;
    const insights = (profile.insights || '').toLowerCase();
    let score = 0;

    // Preference alignment (primary driver)
    if (item.pref === pref) score += 40;
    if (pref === 'value' && item.deal) score += 20;
    if (pref === 'organic' && item.tags.includes('organic')) score += 15;
    if (pref !== 'organic' && fallbackOrganic && item.tags.includes('organic')) score += 10;

    // Dietary keywords from free-text insights
    const dietaryMap = {
      vegan: 'vegan',
      vegetarian: 'vegetarian',
      'gluten-free': 'gluten-free',
      gluten: 'gluten-free',
      keto: 'keto',
      'dairy-free': 'dairy-free',
      dairy: 'dairy-free',
      protein: 'high-protein',
      'high-protein': 'high-protein',
      omega: 'omega-3',
    };
    for (const [keyword, tag] of Object.entries(dietaryMap)) {
      if (insights.includes(keyword) && item.tags.includes(tag)) score += 12;
    }

    // Slight boost for items on sale
    if (item.deal) score += 5;

    return score;
  }

  function filterByRules(items, profile, limit = 20) {
    return items
      .map(item => ({ ...item, _score: ruleScore(item, profile) }))
      .sort((a, b) => b._score - a._score || a.price - b.price)
      .slice(0, limit);
  }

  // ─── AI filtering via OpenRouter ─────────────────────────────────────────

  function buildPrompt(items, profile, mode) {
    const prefLabel = {
      organic: 'Organic & Natural',
      value: 'Best Value',
      premium: 'Brand Loyal / Premium',
    }[profile.productPreference] || 'Best Value';

    const compact = items.map(i =>
      `${i.id}|${i.name}|${i.cat}|$${i.price}|${i.cal}cal|tags:${i.tags.join(',')}|pref:${i.pref}${i.deal ? '|DEAL:' + i.deal + '%off' : ''}`
    ).join('\n');

    const modeInstructions = {
      deals: 'Return the 15 best DEAL items that match this shopper. Prioritize items on sale that align with their preference.',
      lists: 'Return 30 items that form a well-rounded weekly grocery list for this shopper across different categories.',
      recipes: 'Return 12 items that are great for home cooking and match this shopper's dietary lifestyle.',
    }[mode] || 'Return the 20 most relevant items for this shopper.';

    return `You are a grocery personalization engine. Given the shopper profile and item list below, ${modeInstructions}

SHOPPER PROFILE:
- Age: ${profile.age || 'unknown'}
- Gender: ${profile.gender || 'unknown'}
- Shopping Mode: ${profile.shoppingMode || 'unknown'}
- Product Preference: ${prefLabel}
- Organic Fallback: ${profile.organicFallback ? 'yes (organic when preferred not available)' : 'no'}
- Personal Notes: ${profile.insights || 'none'}

ITEMS (format: id|name|category|price|calories|tags|preference|deal):
${compact}

Respond ONLY with a JSON array of item IDs in ranked order, most relevant first.
Example: ["P001","D003","M002"]
No explanation, no markdown, just the JSON array.`;
  }

  async function filterWithAI(items, profile, mode = 'deals', apiKey) {
    if (!apiKey) return null; // signal to use fallback

    const prompt = buildPrompt(items, profile, mode);

    try {
      const res = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://cypetee.github.io/opticart_ai',
          'X-Title': 'OptiCart',
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 300,
          temperature: 0.3,
        }),
      });

      if (!res.ok) {
        console.warn('OpenRouter error:', res.status, await res.text());
        return null;
      }

      const data = await res.json();
      const raw = data.choices?.[0]?.message?.content?.trim();
      if (!raw) return null;

      // Extract JSON array from response
      const match = raw.match(/\[[\s\S]*\]/);
      if (!match) return null;

      const ids = JSON.parse(match[0]);
      if (!Array.isArray(ids)) return null;

      // Map IDs back to items, preserving AI order
      const idMap = Object.fromEntries(items.map(i => [i.id, i]));
      const ranked = ids.map(id => idMap[id]).filter(Boolean);

      // Append any items the AI didn't mention but that scored highly (rule-based tail)
      const includedIds = new Set(ids);
      const ruleTail = filterByRules(
        items.filter(i => !includedIds.has(i.id)),
        profile, 5
      );

      return [...ranked, ...ruleTail];
    } catch (err) {
      console.warn('AI filter failed, using rules:', err.message);
      return null;
    }
  }

  // ─── Public API ───────────────────────────────────────────────────────────

  /**
   * getItems(mode, profile, apiKey, limit)
   * mode: 'deals' | 'lists' | 'recipes'
   * Returns a Promise that resolves to an array of ranked grocery items.
   */
  async function getItems(mode, profile, apiKey, limit = 20) {
    const db = window.GROCERY_DB;
    if (!db || !db.items) return [];

    let pool = db.items;

    // Pre-filter by mode
    if (mode === 'deals') {
      pool = pool.filter(i => i.deal !== null);
    }

    // Try AI first
    const aiResult = await filterWithAI(pool, profile, mode, apiKey);
    if (aiResult) return aiResult.slice(0, limit);

    // Fallback: rule-based
    return filterByRules(pool, profile, limit);
  }

  /**
   * getRecipes(profile, apiKey, limit)
   * Returns ranked recipe objects with a computed match percentage.
   */
  async function getRecipes(profile, apiKey, limit = 10) {
    const db = window.GROCERY_DB;
    if (!db || !db.recipes) return [];

    const pref = profile.productPreference || 'value';
    const insights = (profile.insights || '').toLowerCase();

    const scored = db.recipes.map(recipe => {
      let score = 0;

      // Check how many recipe items align with preference
      if (db.items) {
        const recipeItems = recipe.items
          .map(id => db.items.find(i => i.id === id))
          .filter(Boolean);

        const prefMatch = recipeItems.filter(i => i.pref === pref).length;
        score += (prefMatch / Math.max(recipeItems.length, 1)) * 40;

        // Dietary tag overlap
        const allTags = new Set(recipeItems.flatMap(i => i.tags));
        const dietaryMap = {
          vegan: 'vegan', vegetarian: 'vegetarian',
          gluten: 'gluten-free', keto: 'keto',
          dairy: 'dairy-free', protein: 'high-protein',
        };
        for (const [kw, tag] of Object.entries(dietaryMap)) {
          if (insights.includes(kw) && (allTags.has(tag) || recipe.tags.includes(tag))) score += 10;
        }
      }

      // Recipe's own tags
      if (recipe.tags.includes(pref)) score += 10;
      if (insights.includes('quick') && recipe.tags.includes('quick')) score += 8;
      if (insights.includes('easy') && recipe.tags.includes('easy')) score += 8;

      const matchPct = Math.min(Math.round(40 + score), 99);
      return { ...recipe, match: matchPct };
    });

    return scored
      .sort((a, b) => b.match - a.match)
      .slice(0, limit);
  }

  return { getItems, getRecipes };
})();
