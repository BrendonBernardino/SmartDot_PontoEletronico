import Constants from 'expo-constants';

const manifest = Constants.manifest;

const ENV = {
  API_URL: manifest?.extra?.API_URL ?? ''
};

export default ENV;