// storage.js — localStorage management for OptiCart user profile

const Storage = (() => {
  const KEY = 'opticart_profile';

  function get() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || {};
    } catch {
      return {};
    }
  }

  function set(updates) {
    const current = get();
    localStorage.setItem(KEY, JSON.stringify({ ...current, ...updates }));
  }

  function clear() {
    localStorage.removeItem(KEY);
  }

  // Typed getters
  function getAge()               { return get().age || null; }
  function getGender()            { return get().gender || null; }
  function getShoppingMode()      { return get().shoppingMode || null; }
  function getProductPreference() { return get().productPreference || 'value'; }
  function getOrganicFallback()   { return get().organicFallback ?? false; }
  function getInsights()          { return get().insights || ''; }
  function getApiKey()            { return get().apiKey || ''; }

  function isOnboardingComplete() {
    const p = get();
    return !!(p.age && p.gender && p.shoppingMode && p.productPreference);
  }

  return {
    get, set, clear,
    getAge, getGender, getShoppingMode,
    getProductPreference, getOrganicFallback,
    getInsights, getApiKey, isOnboardingComplete
  };
})();
