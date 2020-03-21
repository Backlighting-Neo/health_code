import Config from "./types";

export default {
  ...require('./default.config').default,
  ...require(`./${process.env.APP_ENV || 'local'}.config`).default
} as Config;