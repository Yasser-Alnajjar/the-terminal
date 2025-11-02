//https://pm2.keymetrics.io/docs/usage/application-declaration/
module.exports = {
  name: "The Terminal", // Name of your application
  script: "server.js", // Entry point of your application
  interpreter: "node", // Path to the Bun interpreter
  //interpreter_args: '--bun', // Option to pass to the interpreter
  env: {
    NEXT_PUBLIC_API_BASE_URL: "http://167.71.54.68:53473",
    NEXT_PUBLIC_STAND_ALONE_API_BASE_URL:
      "http://localhost:8080/api/standalone",
    DEFAULT_CULTURE_NAME: "ar-EG",
    SITE_NAME: "falcon",
    SITE_DOMAIN: "http://167.71.54.68:5188",
    NEXTAUTH_URL: "http://167.71.54.68:5188",
    NEXTAUTH_SECRET: "SqwfDbkaRzzgqNatUWDO4peHygxyIFD9TQ/x+q6oz+U=",
    HASH_SECRET:
      "2df69ad03ac02a3488971fc2b47f61507c107d52f5eb271fbc5b2c70357ccb460b1f9d98b454605c9be38221eed4da7d29a23b896bbeac414ac437002d102f64",
    ALLOWED_EMAIL: "admin@falconfocus.io",
    ALLOWED_PASSWORD: "sf0G6SqtSVGneI5",
    PORT: 5188,
  },
};
