let apiURL
let authURL
let env = process.env.REACT_APP_ENV

if (env === 'dev') {
  apiURL = 'http://localhost:1000'
  authURL = 'http://localhost:5000'
} else if (env === 'prod') {
  apiURL = 'https://elmtreeapi.xyz'
  authURL = 'https://elmtree-auth-frontend.vercel.app'
}

export { apiURL, authURL, env }
