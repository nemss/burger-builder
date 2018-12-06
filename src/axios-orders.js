import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://react-my-burger97.firebaseio.com/'
});

export default instance;