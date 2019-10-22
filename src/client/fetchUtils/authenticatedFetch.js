const authenticatedFetch = (url, options = {}) => {
  const { method, body } = options;
  if (!url) {
    return Promise.reject(new Error('URL required'));
  }
  const token = window.localStorage.getItem('id_token');

  if (!token) {
    return Promise.reject(new Error('Missing token'));
  }

  const params = {
    method: method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    mode: 'cors',
  };
  if (body) {
    params.body = JSON.stringify(body);
  }
  return fetch(`/api${url}`, params)
    .then((res) => res.json());
};

module.exports = authenticatedFetch;
