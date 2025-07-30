declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URL: string;
      JWT_SECRET: string;
      PORT: number;
    }
  }
}