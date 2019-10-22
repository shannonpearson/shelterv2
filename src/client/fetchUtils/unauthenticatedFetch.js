const unauthenticatedFetch = (url, options = {}) => {
  const { method, body } = options;
  if (!url) {
    return Promise.reject(new Error('URL required'));
  }
  const params = {
    method: method || 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  };
  if (body) {
    params.body = JSON.stringify(body);
  }
  return fetch(`/api${url}`, params)
    .then((res) => res.json());
};

module.exports = unauthenticatedFetch;
