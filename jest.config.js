module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  setupFilesAfterEnv: ['<rootDir>/jest/setup.ts'],
  globals: {
    'ts-jest': {
      tsConfig: 'jest.tsconfig.json'
    }
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': '<rootDir>/jest/__mocks__/styleMock.js',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest/__mocks__/fileMock.js',
    '\\.svg': '<rootDir>/jest/__mocks__/svgrMock.js'
  },
  testPathIgnorePatterns: [
    '<rootDir>/.next',
    '<rootDir>/node_modules',
    '<rootDir>/build',
    '<rootDir>/coverage'
  ],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/@types/**/*'],
  collectCoverage: true
}
