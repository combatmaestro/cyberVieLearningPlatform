import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { Bars, LoaderProvider } from "@agney/react-loading";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { CssBaseline, ThemeProvider, createMuiTheme } from '@material-ui/core';
import { GoogleOAuthProvider } from '@react-oauth/google';

const theme = createMuiTheme({
});
ReactDOM.render(
  <GoogleOAuthProvider clientId="449086785583-9vop51gavcavffauj4v5jfmosfm2j988.apps.googleusercontent.com">
  <Provider store={store}>
  <ThemeProvider theme={theme}>
    <LoaderProvider indicator={<Bars width="80" height="80" />}>
       <App />  
    </LoaderProvider>
    </ThemeProvider>
  </Provider>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
