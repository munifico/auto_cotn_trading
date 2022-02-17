import axios from 'axios';
import { server_url } from '../constants/upbitAPIOption';

const upbitAPIClient = axios.create();

upbitAPIClient.defaults.baseURL = server_url;
upbitAPIClient.defaults.headers.common.Accept = 'application/json';

export default upbitAPIClient;