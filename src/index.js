import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css"

ReactDOM.render(
  //<React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  //</React.StrictMode>,
  document.getElementById("root")
);
// do we need both strit mode and browser router?
reportWebVitals();