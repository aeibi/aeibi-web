import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: { target: "./openapi.json" },
    output: {
      client: "react-query",
      httpClient: "axios",
      target: "./src/api/generated.ts",
      override: {
        mutator: { path: "./src/api/mutator.ts", name: "customInstance" },
      },
    },
  },
});
