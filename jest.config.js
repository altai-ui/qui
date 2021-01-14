module.exports = {
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub'
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\](?!lodash-es/).+\\.js$'],
  setupFiles: ['<rootDir>/tests/unit/setup.js'],
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx|js)'],
  testURL: 'http://localhost/',
  coverageReporters: ['text-summary', 'html', 'lcov', 'clover'],
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  coverageThreshold: {
    global: {
      branches: 7,
      functions: 14,
      lines: 17
    }
  }
};
