module.exports = {
  roots: ["<rootDir>/src"],
  clearMocks: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/**/*protocols.ts",
    "!<rootDir>/src/main/server.ts",
    "!<rootDir>/src/**/**/index.ts"
  ],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  preset: "@shelf/jest-mongodb",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
};


