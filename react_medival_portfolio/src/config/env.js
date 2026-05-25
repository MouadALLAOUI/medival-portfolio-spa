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

export default function GET_ENV() {
  // Read from Vite's environment variables. Fallback to DEV if not explicitly set to prod
  const appEnv = import.meta.env.VITE_APP_ENV === "prod" ? "PROD" : "DEV";
  return ENV[appEnv];
}
