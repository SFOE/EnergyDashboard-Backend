/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      "/opt/nodejs/(.*)": "<rootDir>/common/$1"
    },
};
