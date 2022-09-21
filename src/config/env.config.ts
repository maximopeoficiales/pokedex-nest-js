export const EnvConfiguration = () => (
  {
    ENV: process.env.NODE_ENV || 'dev',
    MONGO_BD: process.env.MONGO_BD,
    PORT: process.env.PORT || 3002,
    DEFAULT_LIMIT: process.env.DEFAULT_LIMIT || 7,
  }
)