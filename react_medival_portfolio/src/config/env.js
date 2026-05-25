const ENV = {
  PROD: {
    API_URL: "",
    BACKEND_URL: "",
  },
  DEV: {
    API_URL: 'http://localhost/medival-portfolio-apis/api',
    BACKEND_URL: 'http://localhost/medival-portfolio',
    API_KEY: 'MEDIEVAL_API_KEY_12345'
  },
};

const APP_ENV = "DEV";

export default function GET_ENV() {
  return ENV[APP_ENV];
}
