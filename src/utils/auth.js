const TokenKey = 'diveroid'


export const getStorage = function(key) {
  if (localStorage.getItem(key)) {
    return localStorage.getItem(key);
  }
  return null;
};

export const setStorage = function(key, value) {
  localStorage.setItem(key, value);
};

export const delStorage = function(key) {
  if (!key) return;
  const keys = key.split(" ");
  keys.forEach(key => {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
    }
  });
};

export const clearStorage = function() {
  localStorage.clear();
};
export function getToken() {
  return getStorage(TokenKey);
}

export function setToken(token) {
  return setStorage(TokenKey, token)
}

export function removeToken() {
  return delStorage(TokenKey)
}
