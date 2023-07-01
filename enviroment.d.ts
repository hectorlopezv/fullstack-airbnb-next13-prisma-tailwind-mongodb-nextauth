declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string; // this is the line you want
      NODE_ENV: "development" | "production";
    }
  }
}
export {};
