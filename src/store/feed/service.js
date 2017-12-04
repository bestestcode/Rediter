import axios from 'axios';
import { handleResponse } from '../../_common/helpers';

export const ROOT_URL = 'https://www.reddit.com';

export const getThreads = path => handleResponse(axios.get(`${ROOT_URL}${path}`));
