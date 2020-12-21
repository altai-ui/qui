module.exports = {
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub'
  },
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/tests/unit/*.vue'],
  setupFiles: ['<rootDir>/tests/unit/setup.js'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\](?!lodash-es/).+\\.js$'],
  coverageReporters: ['text-summary', 'html', 'lcov', 'clover']
};
