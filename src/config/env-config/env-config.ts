export default function envConfig() {
  return {
    app: {
      environment: process.env.NODE_ENV,
      port: parseInt(process.env.APP_PORT, 10),
    },
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      name: process.env.DATABASE_NAME,
    },
    session: {
      secret: process.env.SESSION_SECRET,
    },
  };
}
