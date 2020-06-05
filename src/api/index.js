import { sleep } from '../helpers';

const API = async (endpoint, data) => {
  console.log('API', endpoint, data);

  await sleep(2000);
  if (endpoint === 'login') {
    if (data.email === 'email@tm.com') {
      if (data.password === 'tmtest') {
        return { status: 'success' };
      } else {
        return { status: 'error', error: 'wrong password' };
      }
    } else {
      return {
        status: 'error',
        error: 'please check your email or your password'
      };
    }
  }

  if (endpoint === 'otpcode') {
    console.log('data', data);
    if (data.otpCode === '111111') {
      return { status: 'error', error: 'expired code' };
    } else if (data.otpCode === '000000') {
      return { status: 'success' };
    } else {
      return { status: 'error', error: 'wrong code' };
    }
  }
};

export default API;
