const fetchIt = (uri, data = {} ) => {
  return fetch(uri, data)
    .then((response) => {
      const contentType = response.headers.get("content-type");
      if ( contentType && contentType.includes("application/json") )
        return response.json();
    //  throw new TypeError(`Oops, we haven't got JSON!`);
    })
    .catch((error) => {
      console.log(error)
    });
}
const getIt = (uri, data) => {
  return fetchIt(uri, data);
}
const postIt = (uri, data)  => {
  return fetchIt(uri, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'client', // *client, no-referrer
  });
}
const putIt = (uri, data) => {
  return fetchIt(uri, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'content-type': 'application/json'
    },
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'client', // *client, no-referrer
  });
}
const deleteIt = (uri, data) => {
  return fetchIt(uri, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'content-type': 'application/json'
    },
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'client', // *client, no-referrer
  });
}
export { fetchIt, getIt, postIt, putIt, deleteIt };