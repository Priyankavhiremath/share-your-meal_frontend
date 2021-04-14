let serverUrl;

const { NODE_ENV, REACT_APP_BACKEND_API_LOCAL, REACT_APP_BACKEND_API_HEROKU } = process.env

if (NODE_ENV === "production") {
    serverUrl = REACT_APP_BACKEND_API_HEROKU;
} else {
    serverUrl = REACT_APP_BACKEND_API_LOCAL;
}

export default serverUrl;