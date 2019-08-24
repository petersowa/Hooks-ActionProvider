import React from "react";
import ReactDOM from "react-dom";

import ListProvider from "./list-app/ListProvider";

import "./styles.css";

function App() {
  return <ListProvider />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
