// OptiCart — Rich Recipes Database (20 recipes across 5 categories)
// Images sourced from Unsplash (free to use)

window.RECIPES_V2 = [

  // ── VEGAN ──────────────────────────────────────────────────────────────────

  {
    id: 'RV001',
    name: 'Buddha Bowl',
    category: 'vegan',
    emoji: '🥗',
    image: 'https://images.unsplash.com/photo-cSLARYGJt5k?auto=format&fit=crop&w=600&q=80',
    time: 25, servings: 2, calories: 420,
    description: 'A vibrant, nourishing bowl loaded with quinoa, roasted chickpeas, avocado, and a creamy tahini dressing.',
    tags: ['vegan', 'gluten-free', 'high-protein'],
    ingredients: [
      { display: 'Quinoa', amount: '1 cup', search: 'quinoa' },
      { display: 'Chickpeas', amount: '1 can', search: 'chickpea' },
      { display: 'Avocado', amount: '1', search: 'avocado' },
      { display: 'Sweet Potato', amount: '1 large', search: 'sweet potato' },
      { display: 'Kale', amount: '2 cups', search: 'kale' },
      { display: 'Olive Oil', amount: '2 tbsp', search: 'olive oil' },
    ]
  },

  {
    id: 'RV002',
    name: 'Mushroom Pasta',
    category: 'vegan',
    emoji: '🍝',
    image: 'https://images.unsplash.com/photo-4OEnJUQ5muI?auto=format&fit=crop&w=600&q=80',
    time: 20, servings: 2, calories: 380,
    description: 'Silky pasta tossed with earthy mushrooms, garlic, and fresh herbs in a rich olive oil sauce.',
    tags: ['vegan', 'quick'],
    ingredients: [
      { display: 'Pasta', amount: '8 oz', search: 'pasta' },
      { display: 'Mushrooms', amount: '2 cups', search: 'mushroom' },
      { display: 'Garlic', amount: '4 cloves', search: 'garlic' },
      { display: 'Spinach', amount: '2 cups', search: 'spinach' },
      { display: 'Olive Oil', amount: '3 tbsp', search: 'olive oil' },
      { display: 'Onion', amount: '1', search: 'onion' },
    ]
  },

  {
    id: 'RV003',
    name: 'Red Lentil Soup',
    category: 'vegan',
    emoji: '🍲',
    image: 'https://images.unsplash.com/photo-1547592166-23ac48db0de2?auto=format&fit=crop&w=600&q=80',
    time: 35, servings: 4, calories: 290,
    description: 'A warming, spiced red lentil soup with tomatoes, carrots, and cumin — perfect for meal prep.',
    tags: ['vegan', 'gluten-free', 'budget'],
    ingredients: [
      { display: 'Red Lentils', amount: '1½ cups', search: 'lentil' },
      { display: 'Carrots', amount: '2', search: 'carrot' },
      { display: 'Tomatoes', amount: '1 can', search: 'tomato' },
      { display: 'Onion', amount: '1 large', search: 'onion' },
      { display: 'Garlic', amount: '3 cloves', search: 'garlic' },
      { display: 'Olive Oil', amount: '2 tbsp', search: 'olive oil' },
    ]
  },

  {
    id: 'RV004',
    name: 'Avocado Toast',
    category: 'vegan',
    emoji: '🥑',
    image: 'https://images.unsplash.com/photo-ui-pynyV3Nc?auto=format&fit=crop&w=600&q=80',
    time: 10, servings: 1, calories: 310,
    description: 'Creamy smashed avocado on sourdough toast with cherry tomatoes, red pepper flakes, and lemon.',
    tags: ['vegan', 'quick', 'breakfast'],
    ingredients: [
      { display: 'Sourdough Bread', amount: '2 slices', search: 'bread' },
      { display: 'Avocado', amount: '1 ripe', search: 'avocado' },
      { display: 'Cherry Tomatoes', amount: '½ cup', search: 'tomato' },
      { display: 'Lemon', amount: '1', search: 'lemon' },
      { display: 'Olive Oil', amount: '1 tbsp', search: 'olive oil' },
    ]
  },

  // ── VEGETARIAN ─────────────────────────────────────────────────────────────

  {
    id: 'RVG001',
    name: 'Shakshuka',
    category: 'vegetarian',
    emoji: '🍳',
    image: 'https://images.unsplash.com/photo-1559847651-b5d35b18b9c4?auto=format&fit=crop&w=600&q=80',
    time: 25, servings: 2, calories: 340,
    description: 'Eggs poached in a rich, spiced tomato and pepper sauce — a Middle Eastern one-pan classic.',
    tags: ['vegetarian', 'gluten-free', 'quick'],
    ingredients: [
      { display: 'Eggs', amount: '4 large', search: 'egg' },
      { display: 'Tomatoes', amount: '1 can crushed', search: 'tomato' },
      { display: 'Bell Pepper', amount: '1', search: 'bell pepper' },
      { display: 'Onion', amount: '1', search: 'onion' },
      { display: 'Garlic', amount: '3 cloves', search: 'garlic' },
      { display: 'Olive Oil', amount: '2 tbsp', search: 'olive oil' },
    ]
  },

  {
    id: 'RVG002',
    name: 'Margherita Flatbread',
    category: 'vegetarian',
    emoji: '🍕',
    image: 'https://images.unsplash.com/photo-wgq8NVyXsYY?auto=format&fit=crop&w=600&q=80',
    time: 20, servings: 2, calories: 450,
    description: 'Crispy flatbread topped with tomato sauce, fresh mozzarella, basil, and a drizzle of olive oil.',
    tags: ['vegetarian', 'quick'],
    ingredients: [
      { display: 'Flatbread / Naan', amount: '2', search: 'bread' },
      { display: 'Mozzarella', amount: '4 oz', search: 'mozzarella' },
      { display: 'Tomatoes', amount: '2 large', search: 'tomato' },
      { display: 'Garlic', amount: '2 cloves', search: 'garlic' },
      { display: 'Olive Oil', amount: '2 tbsp', search: 'olive oil' },
      { display: 'Spinach / Basil', amount: '1 cup', search: 'spinach' },
    ]
  },

  {
    id: 'RVG003',
    name: 'Caprese Salad',
    category: 'vegetarian',
    emoji: '🥗',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    time: 10, servings: 2, calories: 280,
    description: 'Classic Italian salad with ripe tomatoes, fresh mozzarella, basil, and a balsamic glaze.',
    tags: ['vegetarian', 'gluten-free', 'quick', 'keto'],
    ingredients: [
      { display: 'Tomatoes', amount: '3 large', search: 'tomato' },
      { display: 'Fresh Mozzarella', amount: '8 oz', search: 'mozzarella' },
      { display: 'Olive Oil', amount: '3 tbsp', search: 'olive oil' },
      { display: 'Lemon', amount: '½', search: 'lemon' },
    ]
  },

  {
    id: 'RVG004',
    name: 'Veggie Stir Fry',
    category: 'vegetarian',
    emoji: '🥢',
    image: 'https://images.unsplash.com/photo-3iexvMShGfQ?auto=format&fit=crop&w=600&q=80',
    time: 20, servings: 2, calories: 320,
    description: 'A colorful mix of broccoli, carrots, and bell peppers tossed in a savory soy-ginger sauce over rice.',
    tags: ['vegetarian', 'quick', 'budget'],
    ingredients: [
      { display: 'Rice', amount: '1 cup', search: 'rice' },
      { display: 'Broccoli', amount: '2 cups', search: 'broccoli' },
      { display: 'Carrots', amount: '2', search: 'carrot' },
      { display: 'Bell Pepper', amount: '1', search: 'bell pepper' },
      { display: 'Garlic', amount: '2 cloves', search: 'garlic' },
      { display: 'Olive Oil', amount: '2 tbsp', search: 'olive oil' },
    ]
  },

  // ── KETO ───────────────────────────────────────────────────────────────────

  {
    id: 'RK001',
    name: 'Bacon & Egg Bowl',
    category: 'keto',
    emoji: '🥓',
    image: 'https://images.unsplash.com/photo-j3vGsJBaP30?auto=format&fit=crop&w=600&q=80',
    time: 15, servings: 1, calories: 520,
    description: 'A satisfying keto breakfast bowl with crispy bacon, soft-scrambled eggs, avocado, and spinach.',
    tags: ['keto', 'gluten-free', 'high-protein', 'breakfast'],
    ingredients: [
      { display: 'Bacon', amount: '4 strips', search: 'bacon' },
      { display: 'Eggs', amount: '3 large', search: 'egg' },
      { display: 'Avocado', amount: '1', search: 'avocado' },
      { display: 'Spinach', amount: '1 cup', search: 'spinach' },
      { display: 'Butter', amount: '1 tbsp', search: 'butter' },
    ]
  },

  {
    id: 'RK002',
    name: 'Cauliflower Fried Rice',
    category: 'keto',
    emoji: '🥦',
    image: 'https://images.unsplash.com/photo-08g_bEUGjes?auto=format&fit=crop&w=600&q=80',
    time: 20, servings: 2, calories: 290,
    description: 'Low-carb cauliflower rice stir-fried with chicken, eggs, and vegetables in a savory sauce.',
    tags: ['keto', 'gluten-free', 'low-carb'],
    ingredients: [
      { display: 'Cauliflower', amount: '1 head', search: 'cauliflower' },
      { display: 'Chicken Breast', amount: '8 oz', search: 'chicken breast' },
      { display: 'Eggs', amount: '2', search: 'egg' },
      { display: 'Carrots', amount: '1', search: 'carrot' },
      { display: 'Garlic', amount: '2 cloves', search: 'garlic' },
      { display: 'Olive Oil', amount: '2 tbsp', search: 'olive oil' },
    ]
  },

  {
    id: 'RK003',
    name: 'Salmon & Avocado Bowl',
    category: 'keto',
    emoji: '🐟',
    image: 'https://images.unsplash.com/photo-1519708227418-a2f1f8fb3396?auto=format&fit=crop&w=600&q=80',
    time: 20, servings: 2, calories: 480,
    description: 'Pan-seared salmon over spinach with avocado, lemon, and olive oil — rich in healthy fats.',
    tags: ['keto', 'gluten-free', 'high-protein', 'omega-3'],
    ingredients: [
      { display: 'Salmon Fillet', amount: '2 fillets', search: 'salmon' },
      { display: 'Avocado', amount: '1', search: 'avocado' },
      { display: 'Spinach', amount: '2 cups', search: 'spinach' },
      { display: 'Lemon', amount: '1', search: 'lemon' },
      { display: 'Olive Oil', amount: '2 tbsp', search: 'olive oil' },
      { display: 'Garlic', amount: '2 cloves', search: 'garlic' },
    ]
  },

  {
    id: 'RK004',
    name: 'Zucchini Noodles with Pesto',
    category: 'keto',
    emoji: '🥒',
    image: 'https://images.unsplash.com/photo-5Q_Edarv5zQ?auto=format&fit=crop&w=600&q=80',
    time: 15, servings: 2, calories: 260,
    description: 'Spiralized zucchini tossed with homemade basil pesto, cherry tomatoes, and parmesan.',
    tags: ['keto', 'gluten-free', 'quick', 'vegetarian'],
    ingredients: [
      { display: 'Zucchini', amount: '3 medium', search: 'zucchini' },
      { display: 'Spinach / Basil', amount: '1 cup', search: 'spinach' },
      { display: 'Cherry Tomatoes', amount: '1 cup', search: 'tomato' },
      { display: 'Olive Oil', amount: '3 tbsp', search: 'olive oil' },
      { display: 'Garlic', amount: '2 cloves', search: 'garlic' },
    ]
  },

  // ── MEAT-HEAVY ─────────────────────────────────────────────────────────────

  {
    id: 'RM001',
    name: 'Classic Beef Burger',
    category: 'meat-heavy',
    emoji: '🍔',
    image: 'https://images.unsplash.com/photo-lsYe-U04H14?auto=format&fit=crop&w=600&q=80',
    time: 20, servings: 2, calories: 680,
    description: 'Juicy beef patties with melted cheddar, crisp lettuce, and tomato on a toasted brioche bun.',
    tags: ['high-protein', 'quick'],
    ingredients: [
      { display: 'Ground Beef', amount: '1 lb', search: 'ground beef' },
      { display: 'Burger Buns', amount: '2', search: 'bread' },
      { display: 'Cheddar Cheese', amount: '2 slices', search: 'cheddar' },
      { display: 'Tomatoes', amount: '1', search: 'tomato' },
      { display: 'Onion', amount: '½', search: 'onion' },
      { display: 'Butter', amount: '1 tbsp', search: 'butter' },
    ]
  },

  {
    id: 'RM002',
    name: 'Grilled Chicken & Rice',
    category: 'meat-heavy',
    emoji: '🍗',
    image: 'https://images.unsplash.com/photo-AvJX9o6w35U?auto=format&fit=crop&w=600&q=80',
    time: 30, servings: 2, calories: 520,
    description: 'Herb-marinated grilled chicken breast served alongside fluffy rice and steamed broccoli.',
    tags: ['high-protein', 'gluten-free', 'budget'],
    ingredients: [
      { display: 'Chicken Breast', amount: '2 fillets', search: 'chicken breast' },
      { display: 'Rice', amount: '1 cup', search: 'rice' },
      { display: 'Broccoli', amount: '2 cups', search: 'broccoli' },
      { display: 'Garlic', amount: '3 cloves', search: 'garlic' },
      { display: 'Olive Oil', amount: '2 tbsp', search: 'olive oil' },
      { display: 'Lemon', amount: '1', search: 'lemon' },
    ]
  },

  {
    id: 'RM003',
    name: 'Beef Tacos',
    category: 'meat-heavy',
    emoji: '🌮',
    image: 'https://images.unsplash.com/photo-N__68TkGeOY?auto=format&fit=crop&w=600&q=80',
    time: 20, servings: 2, calories: 560,
    description: 'Seasoned ground beef in warm tortillas topped with cheddar, lettuce, tomato, and sour cream.',
    tags: ['high-protein', 'quick'],
    ingredients: [
      { display: 'Ground Beef', amount: '¾ lb', search: 'ground beef' },
      { display: 'Tortillas', amount: '6 small', search: 'tortilla' },
      { display: 'Cheddar Cheese', amount: '½ cup', search: 'cheddar' },
      { display: 'Tomatoes', amount: '2', search: 'tomato' },
      { display: 'Onion', amount: '1', search: 'onion' },
      { display: 'Greek Yogurt', amount: '¼ cup', search: 'yogurt' },
    ]
  },

  {
    id: 'RM004',
    name: 'BBQ Chicken Wings',
    category: 'meat-heavy',
    emoji: '🍖',
    image: 'https://images.unsplash.com/photo-PaaboPF3dVY?auto=format&fit=crop&w=600&q=80',
    time: 45, servings: 2, calories: 610,
    description: 'Crispy oven-baked chicken wings glazed in smoky BBQ sauce — a crowd-pleasing classic.',
    tags: ['high-protein', 'gluten-free'],
    ingredients: [
      { display: 'Chicken Wings', amount: '2 lbs', search: 'chicken' },
      { display: 'Garlic', amount: '4 cloves', search: 'garlic' },
      { display: 'Olive Oil', amount: '2 tbsp', search: 'olive oil' },
      { display: 'Butter', amount: '2 tbsp', search: 'butter' },
      { display: 'Lemon', amount: '1', search: 'lemon' },
    ]
  },

  // ── PESCATARIAN ────────────────────────────────────────────────────────────

  {
    id: 'RP001',
    name: 'Salmon Pasta',
    category: 'pescatarian',
    emoji: '🍝',
    image: 'https://images.unsplash.com/photo-1467003909585-b22a5e0d6ceb?auto=format&fit=crop&w=600&q=80',
    time: 25, servings: 2, calories: 510,
    description: 'Flaked salmon with spinach and garlic tossed in pasta with a squeeze of lemon.',
    tags: ['high-protein', 'omega-3', 'quick'],
    ingredients: [
      { display: 'Salmon Fillet', amount: '10 oz', search: 'salmon' },
      { display: 'Pasta', amount: '8 oz', search: 'pasta' },
      { display: 'Spinach', amount: '2 cups', search: 'spinach' },
      { display: 'Garlic', amount: '3 cloves', search: 'garlic' },
      { display: 'Olive Oil', amount: '3 tbsp', search: 'olive oil' },
      { display: 'Lemon', amount: '1', search: 'lemon' },
    ]
  },

  {
    id: 'RP002',
    name: 'Shrimp Tacos',
    category: 'pescatarian',
    emoji: '🌮',
    image: 'https://images.unsplash.com/photo-I-up-WM_Wn4?auto=format&fit=crop&w=600&q=80',
    time: 20, servings: 2, calories: 420,
    description: 'Spiced shrimp in warm tortillas with avocado, lime, and a crunchy cabbage slaw.',
    tags: ['high-protein', 'quick'],
    ingredients: [
      { display: 'Shrimp', amount: '1 lb', search: 'shrimp' },
      { display: 'Tortillas', amount: '6 small', search: 'tortilla' },
      { display: 'Avocado', amount: '1', search: 'avocado' },
      { display: 'Lemon / Lime', amount: '2', search: 'lemon' },
      { display: 'Garlic', amount: '2 cloves', search: 'garlic' },
      { display: 'Olive Oil', amount: '2 tbsp', search: 'olive oil' },
    ]
  },

  {
    id: 'RP003',
    name: 'Tuna Poke Bowl',
    category: 'pescatarian',
    emoji: '🐟',
    image: 'https://images.unsplash.com/photo-1546069901-522a6fbe4f93?auto=format&fit=crop&w=600&q=80',
    time: 15, servings: 2, calories: 390,
    description: 'Hawaiian-style tuna poke bowl with rice, avocado, edamame, and a sesame-soy dressing.',
    tags: ['high-protein', 'omega-3', 'gluten-free'],
    ingredients: [
      { display: 'Tuna (sushi grade)', amount: '10 oz', search: 'tuna' },
      { display: 'Rice', amount: '1 cup', search: 'rice' },
      { display: 'Avocado', amount: '1', search: 'avocado' },
      { display: 'Carrots', amount: '1', search: 'carrot' },
      { display: 'Spinach', amount: '1 cup', search: 'spinach' },
      { display: 'Olive Oil', amount: '1 tbsp', search: 'olive oil' },
    ]
  },

  {
    id: 'RP004',
    name: 'Baked Cod & Vegetables',
    category: 'pescatarian',
    emoji: '🐠',
    image: 'https://images.unsplash.com/photo-ShB41o9k0nI?auto=format&fit=crop&w=600&q=80',
    time: 30, servings: 2, calories: 340,
    description: 'Tender baked cod on a sheet pan with broccoli, carrots, and lemon — light and delicious.',
    tags: ['high-protein', 'gluten-free', 'low-carb', 'omega-3'],
    ingredients: [
      { display: 'Cod Fillet', amount: '2 fillets', search: 'cod' },
      { display: 'Broccoli', amount: '2 cups', search: 'broccoli' },
      { display: 'Carrots', amount: '2', search: 'carrot' },
      { display: 'Lemon', amount: '1', search: 'lemon' },
      { display: 'Garlic', amount: '3 cloves', search: 'garlic' },
      { display: 'Olive Oil', amount: '2 tbsp', search: 'olive oil' },
    ]
  },

];
