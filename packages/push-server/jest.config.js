// jest.config.js
module.exports = {
  verbose: true,
  testMatch: ['<rootDir>/__tests__/**/*.test.js'],
  testPathIgnorePatterns: ['<rootDir>/dist/'],
  modulePathIgnorePatterns: ['dist/'],
  collectCoverageFrom: ['src/**/*.js']
};
