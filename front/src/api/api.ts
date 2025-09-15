import axios from "axios";
import taskApi from "./task";


export const api = axios.create({
    baseURL: 'http://localhost:3333/'
})
