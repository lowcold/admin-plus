export class local {
  static get(key) {
    const val = window.localStorage.getItem(key);
    if (val == "undefined") {
      return null;
    } else {
      return JSON.parse(val);
    }
  }
  static set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  static remove(key) {
    window.localStorage.removeItem(key);
  }
}
