const readFromEnv = (name: string, defaultValue?: string) => {
  const value = process.env[name];

  if (!value && defaultValue === undefined) {
    throw new Error(`Init error, process.env.${name} is unset`);
  }

  if (value) {
    return value;
  }

  return defaultValue || '';
};

export const loadConfig = () => {
  const envConfig = {
    db: {
      name: readFromEnv('APP_DB_NAME'),
      host: readFromEnv('APP_DB_HOST'),
      user: readFromEnv('APP_DB_USER'),
      password: readFromEnv('APP_DB_PASSWORD'),
    },
    server: {
      host: readFromEnv('APP_SERVER_HOST'),
      port: parseInt(readFromEnv('APP_SERVER_PORT'), 10),
    },
  };

  return envConfig;
};
