import {endpoints} from './constants'


export async function callAPI({url, method, payload}) {
  const user = JSON.parse(localStorage.getItem('user'));
  return fetch(
    `${endpoints.backendURL}/${url}`,
    {
      method: method,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({...payload,user}),
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
    });
}

export default callAPI;
