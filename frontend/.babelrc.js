const env = require('./env-config.js')

module.exports = {
    "env": {
        "development": {
          "presets": [
            "next/babel"
          ],
          "plugins": [
            [
              "styled-components",
              {
                "ssr": true,
                "displayName": true
              }
            ], ['transform-define', env]
          ]
        },
        "production": {
          "presets": [
            "next/babel"
          ],
          "plugins": [
            [
              "styled-components",
              {
                "ssr": true,
                "displayName": true
              }
            ], ['transform-define', env]
          ]
        },
        "test": {
          "presets": [
            [
              "next/babel",
              {
                "preset-env": {
                  "modules": "commonjs"
                }
              }
            ]
          ],
          "plugins": [
            [
              "styled-components",
              {
                "ssr": true,
                "displayName": true
              }
            ]
          ]
        }
      }
}