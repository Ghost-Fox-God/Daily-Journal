import axios from "axios";

const fetchData = async () => {
const response =  await axios.get(`https://2xi9f2w3e2.execute-api.us-east-1.amazonaws.com/dev`);

console.log("Data received:", response);

}
fetchData();