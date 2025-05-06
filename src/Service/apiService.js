import axios from "axios";

//set the base URL for your API
const API_BASE="https://donna2029.pythonanywhere.com/api/";

//function to log in the user
export const loginuser = (credentials) => {
    return axios.post(`${API_BASE}/login`, credentials);//login
};

//function to sign up a new user
export const signupUser = (userData) => {
    return axios.post(`${API_BASE}/signup/`,userData);// Signup
};
//Function to add a new employee
//export const addEmployee =(employeeData)=> {
    //return axios.post()}