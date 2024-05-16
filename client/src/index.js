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
import { GoogleOAuthProvider } from '@react-oauth/google';
ReactDOM.render(
  <GoogleOAuthProvider clientId="257899612719-9jsfnkbb5i5kgp6r34754vdlmjcdi6jb.apps.googleusercontent.com">
  <Provider store={store}>
    <LoaderProvider indicator={<Bars width="80" height="80" />}>
       <App />  
    </LoaderProvider>
  </Provider>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
