export default {
  rootDir: ".", // Use the project root as the base directory
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Map "@/..." to the "src" folder based on tsconfig.json
  },
  testEnvironment: "jsdom", // Use jsdom for testing React components
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Use ts-jest for TypeScript files
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Optional: setup file for jest-dom
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"], // Supported file extensions
};
