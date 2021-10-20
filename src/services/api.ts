import axios from 'axios'
 
const api = axios.create({
    baseURL: 'https://backend-aluno.herokuapp.com'
})
 
export default api;