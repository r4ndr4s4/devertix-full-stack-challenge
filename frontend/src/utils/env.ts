import { cleanEnv, url } from "envalid";

const env = cleanEnv(import.meta.env, {
  VITE_BACKEND_BASE_URL: url({
    default:
      "https://ssoo24vldyrivr6skhwr5w4zb40qoakj.lambda-url.eu-central-1.on.aws",
  }),
});

export default env;
