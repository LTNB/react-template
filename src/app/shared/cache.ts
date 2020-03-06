class Cache {
  private cache: { [key:string]: string } = {};

  hasLocalStorage() {
    try {
      return 'localStorage' in window && window.localStorage !== null;
    } catch (e) {
      return false;
    }
  }

  get(key: string) {
    if (this.hasLocalStorage()) {
      return localStorage.getItem(key) || undefined;
    } else {
      return this.cache[key] || undefined;
    }
  }

  set(key: string, value: string) {
    if (this.hasLocalStorage()) {
      localStorage.setItem(key, value);
    } else {
      this.cache[key] = value;
    }
  }

  remove(key: string) {
    if (this.hasLocalStorage()) {
      localStorage.removeItem(key);
    } else {
      delete this.cache[key];
    }
  }
}

export const AppCache = new Cache();