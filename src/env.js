let apiURL
let authURL
let env = 'dev'

if (env === 'dev') {
  apiURL = 'http://localhost:1000'
  authURL = 'http://localhost:5000'
} else if (env === 'prod') {
  apiURL = 'http://api.elmtree.io'
  authURL = 'http://auth.elmtree.io'
}

export { apiURL, authURL, env }
