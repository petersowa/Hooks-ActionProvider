import React from "react";
import ReactDOM from "react-dom";

import ListApp from "./list-app/ListAppProvider";

import "./styles.css";

function App() {
  return <ListApp />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
