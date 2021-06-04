import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { Provider } from "./state/mainContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
  rootElement
);
