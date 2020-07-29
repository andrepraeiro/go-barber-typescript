export default {
  jwt: {
    secret: process.env.APP_SECRET || 'not-defined',
    expiresIn: '1d',
  },
};
