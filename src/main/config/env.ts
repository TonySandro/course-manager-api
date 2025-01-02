export default {
  mongoUrl: process.env.MONGO_URL || "mongodb://mongo:27017/register-api",
  port: process.env.PORT || 5353,
  jwtSecret: process.env.JWT_SECRET || "ç.`!jjd3o",
};
