import axios from 'axios';

const request = requestObj => new Promise((resolve, reject) => {
  axios(requestObj)
    .then(response => resolve(response))
    .catch(error => reject(error));
});

export const performGet = (
  url,
  params = {},
  headers,
  config = {}
) => request({
  params,
  method: 'get',
  url,
  headers,
  config,
});

export const performMultipleGet = (requests) => {
  const axiosRequests = requests.map(r => axios(r));
  return Promise.all(axiosRequests);
};

export default {};
