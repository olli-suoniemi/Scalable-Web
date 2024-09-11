module.exports = {
  timeout: 10000,
  retries: 2,   // sometimes some tests need 2 runs
  reporter: "list",
  workers: 5,
  use: {
    baseURL: "http://localhost:7800",
    headless: true,
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: "e2e-headless-chromium",
      use: {
        browserName: "chromium",
      },
    },
  ],
};
