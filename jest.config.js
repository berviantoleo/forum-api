module.exports = {
    transform: {
        "\\.[jt]sx?$": "babel-jest"
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/(?!(uuid)/)"],
    collectCoverageFrom: [
        "src/**/*.{js,jsx}",
        "!**/node_modules/**",
        "!**/vendor/**",
        "!src/app.js"
    ]
}
