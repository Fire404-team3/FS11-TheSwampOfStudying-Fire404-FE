const storage = {
  get: (key, defaultValue = null) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (error) {
      console.error(`로컬스토리지 GET 에러 (${key}):`, error);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`로컬스토리지 SET 에러 (${key}):`, error);
    }
  },
};

export default storage;
