export const setToken = (token) => {
  window.localStorage.setItem('id_token', token);
};

export const logout = () => {
  window.localStorage.deleteItem('id_token');
};
