module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testPathIgnorePatterns: ['/node_modules'],
  transform: {
    '\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!variables/.*)'],
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
  },
};
