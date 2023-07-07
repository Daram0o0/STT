import axios from 'axios';

const url = "http://localhost:5000/"

async function get(location: String) {
  let res = await axios({
    method: "GET",
    url: url + location,
  });

  return res.data;
}

async function post(location: String, data: any) {
  let res = await axios({
    method: "POST",
    url: url + location,
    data: data,
  })

  return res.data;
}

export { get, post };