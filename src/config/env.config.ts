import { ConfigEnv } from "./interfaces/config.interface";

export const EnvConfiguration = (): ConfigEnv => (
  {
    ENV: process.env.NODE_ENV || 'dev',
    MONGO_DB: process.env.MONGO_DB,
    PORT: +process.env.PORT || 3002,
    DEFAULT_LIMIT: +process.env.DEFAULT_LIMIT || 5,
  }
)