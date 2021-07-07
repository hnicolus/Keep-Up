import axios from "axios";
const BASE_ENDPOINT = 'https://9pylrbkatk.execute-api.eu-central-1.amazonaws.com/dev';

 // Set config defaults 
const http = axios.create({
    baseURL: BASE_ENDPOINT
});

export {http } ;