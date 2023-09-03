export const appConfig = {
  port: process.env.PORT || 3000,
  baseUrl: process.env.BASE_URL,
  ttl: process.env.TTL,
  validationPipeOptions: {
    whitelist: true,
    transform: true,
    forbidUnknownValues: false,
  },
};
