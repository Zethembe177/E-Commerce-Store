import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import store from "./redux/store";
import ScrollToTop from "./components/ScrollToTop";
import App from "./App"; // <-- import App here
import "@fortawesome/fontawesome-free/css/all.min.css";
// main.jsx or index.jsx
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ScrollToTop>
      <Provider store={store}>
        <App />  {/* <-- use App here */}
      </Provider>
    </ScrollToTop>
    <Toaster />
  </BrowserRouter>
);
