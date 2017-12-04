export const handleResponse = axiosPromise => axiosPromise
  .then(response =>
    // console.log(`response headers: ${JSON.stringify(response.headers)}`);
    response.data)
  .catch((error) => {
    if (!error.response) { // Network error
      return Promise.reject('Network error');
    } else { // server error
      const code = error.response.status;
      const response = error.response.data;
      return Promise.reject(response);
    }
  });
