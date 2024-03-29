module.exports = {
  "transform": {
    "^.+\\.tsx?$":"ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "moduleFileExtensions": [
    "ts",
    "js"
  ],
  "collectCoverage": true,
  "testURL":"http://localhost"
}