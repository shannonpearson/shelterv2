const setToken = (token) => {
  window.localStorage.setItem('id_token', token);
};

const logout = () => {
  window.localStorage.removeItem('id_token');
  window.location.reload();
};

module.exports = { setToken, logout };
