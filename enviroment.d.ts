declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string; // this is the line you want
      GITHUB_CLIENT_SECRET: string;
      GITHUB_CLIENT_ID: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      NEXTAUTH_SECRET: string;
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
      NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: string;
      NODE_ENV: "development" | "production";
    }
  }
}
export {};
