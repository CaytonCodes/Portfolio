const errorHandler = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

const request = (url, callback, params = null, method = 'GET') => {
  if (method === 'GET') {
    if (params) {
      // eslint-disable-next-line no-param-reassign
      url += `?${(new URLSearchParams(params)).toString()}`;
    }
  }
  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: method === 'GET' ? null : JSON.stringify(params),
  })
    .then(errorHandler)
    .then((response) => response.json())
    .then((json) => {
      console.log('response:', json);
      callback({ success: true, json });
    })
    .catch((error) => {
      console.log('error:', error);
      callback({ success: false, error });
    });
};

export const getDataFieldsReq = (callback) => {
  const url = '/api/v1/admin/base-data';
  request(url, callback, null, 'GET');
};

export const getPostData = (callback, params) => {
  const url = '/api/v1/admin/post-data';
  request(url, callback, params, 'POST');
};

export const postData = (dataObj, callback) => {
  const url = '/api/v1/admin/base-data';
  const params = { dataObj };
  request(url, callback, params, 'POST');
};

export const getProjects = (callback, params = null) => {
  const url = '/api/v1/admin/projects';
  request(url, callback, params, 'GET');
};

export const getApp = (callback, params) => {
  const url = '/api/v1/admin/app';
  request(url, callback, params, 'GET');
}