import { devices, type PlaywrightTestConfig } from "@playwright/test";
import path from "path";

// Use process.env.PORT by default and fallback to port 3000
const PORT = process.env.PORT || 3000;

// Set webServer.url and use.baseURL with the location of the WebServer respecting the correct set port
const baseURL = `http://localhost:${PORT}`;

// Reference: https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
  // Reduce CI workers to prevent overwhelming GitHub Actions
  workers: process.env.CI ? 2 : 4,
  // Increase CI timeout to match local
  timeout: 120 * 1000,
  // Test directory
  testDir: path.join(__dirname, "e2e"),
  // If a test fails, retry it additional 2 times
  retries: 2,
  // Artifacts folder where screenshots, videos, and traces are stored.
  outputDir: "test-results/",
  reporter: process.env.CI ? "github" : "list",

  // Run your local dev server before starting the tests:
  // https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
  webServer: {
    command: process.env.CI ? "pnpm dev" : "cross-env NODE_ENV=test pnpm dev",
    url: baseURL,
    timeout: process.env.CI ? 180 * 1000 : 120 * 1000, // Increased timeout for CI
    reuseExistingServer: !process.env.CI,
    stdout: "ignore",
    stderr: "pipe",
  },
  expect: {
    // Increase CI timeout to handle slower CI environment
    timeout: 15 * 1000,
  },

  use: {
    // Use baseURL so to make navigations relative.
    // More information: https://playwright.dev/docs/api/class-testoptions#test-options-base-url
    baseURL,

    // Retry a test if its failing with enabled tracing. This allows you to analyse the DOM, console logs, network traffic etc.
    // More information: https://playwright.dev/docs/trace-viewer
    trace: "retain-on-failure",

    // Add retry strategy for network actions
    navigationTimeout: 30 * 1000,
    actionTimeout: 30 * 1000,

    // Add video recording for failed tests in CI
    video: process.env.CI ? "retain-on-failure" : "off",
    screenshot: process.env.CI ? "only-on-failure" : "off",

    // All available context options: https://playwright.dev/docs/api/class-browser#browser-new-context
    // contextOptions: {
    //   ignoreHTTPSErrors: true,
    // },
  },

  projects: [
    {
      name: "with-user-setup",
      testMatch: "_setups/user.setup.ts",
    },
    {
      name: "with-app-admin-setup",
      testMatch: "_setups/admin.setup.ts",
    },
    {
      name: "with-second-user-setup",
      testMatch: "_setups/user2.setup.ts",
    },
    {
      name: "admin-users",
      testMatch: "admin/**/*.spec.ts",
      retries: 0,
      dependencies: [
        "with-user-setup",
        "with-second-user-setup",
        "with-app-admin-setup",
      ],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/app_admin.json",
      },
    },
    {
      name: "logged-in-users",
      testMatch: "user/**/*.spec.ts",
      retries: 0,
      dependencies: ["with-user-setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user_1.json",
      },
    },

    {
      name: "anon-users",
      testMatch: "anon/**/*.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "password-updation",
      testMatch: "password-updation/**/*.spec.ts",
      dependencies: ["logged-in-users"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user_1.json",
      },
    },
  ],
  globalSetup: "./playwright/global-setup.ts",
};
export default config;
