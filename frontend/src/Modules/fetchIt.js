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
export default fetchIt;