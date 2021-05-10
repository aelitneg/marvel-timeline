import { combineReducers } from 'redux';

import auth from './auth';
import releases from './releases';

export default combineReducers({ auth, releases });
