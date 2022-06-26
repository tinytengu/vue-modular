import Cookies from "js-cookie";

const cookiesStorage = {
  getItem: (key: string) => Cookies.get(key),
  setItem: (key: string, value: any) => Cookies.set(key, value),
  removeItem: (key: string) => Cookies.remove(key),
};

export default cookiesStorage;
