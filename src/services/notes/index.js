import axios from "axios";

export const getAll = () => {
  return axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
    const { data } = res;
    return data;
  });
};

export const create = ({ title, body, userId }) => {
  return axios
    .post("https://jsonplaceholder.typicode.com/posts", { title, body, userId })
    .then((res) => {
      const { data } = res;
      return data;
    });
};
