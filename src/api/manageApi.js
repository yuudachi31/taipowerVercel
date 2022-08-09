import axios from 'axios';

const baseURL = `http://localhost:5000/api/v1/`
const token = document.cookie.split('; ').find(row => row.startsWith('fltk'))? true:false;