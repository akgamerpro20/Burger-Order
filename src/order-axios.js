import axios from "axios";

const Axios = axios.create({
  baseURL: "https://react-my-burger-ae5a6.firebaseio.com/",
});

export default Axios;
