module.exports = {
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.(jsx?)$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub'
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\](?!lodash-es/|\\@qvant/qui).+\\.(js|vue)$'
  ],
  setupFiles: ['<rootDir>/tests/unit/setup.js'],
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx|js)'],
  testURL: 'http://localhost/',
  coverageReporters: ['text-summary', 'html', 'lcov', 'clover'],
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  coverageThreshold: {
    global: {
      branches: 28.0,
      functions: 43.0,
      lines: 45.0
    }
  }
};
