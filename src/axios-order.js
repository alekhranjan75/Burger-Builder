import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-burger-app-ab17c.firebaseio.com/'
});

export default instance;