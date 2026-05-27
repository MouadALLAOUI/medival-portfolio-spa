export default function GET_ENV() {
  // Read from Vite's environment variables. Fallback to DEV if not explicitly set to prod.
  const isProd = import.meta.env.VITE_APP_ENV === "prod";

  return {
    API_URL: isProd
      ? (import.meta.env.VITE_API_URL || "")
      : (import.meta.env.VITE_API_URL || "http://localhost/medival-portfolio-apis/api"),
    BACKEND_URL: isProd
      ? (import.meta.env.VITE_BACKEND_URL || "")
      : (import.meta.env.VITE_BACKEND_URL || "http://localhost/medival-portfolio"),
    // API key must be set in Netlify environment variables as VITE_API_KEY — never hardcode it here
    API_KEY: import.meta.env.VITE_API_KEY || "",
  };
}
