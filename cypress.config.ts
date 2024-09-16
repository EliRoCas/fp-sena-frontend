import { defineConfig } from "cypress";

export default defineConfig({
  projectId: '2io1ge',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
