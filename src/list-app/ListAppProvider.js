import React from "react";

import ActionProvider from "../reducers/ActionProvider";
import mutations from "./mutations";

import ListApp from "./ListApp";
import ListContext from "./ListContext";

export default () => (
  <ActionProvider Context={ListContext} mutations={mutations}>
    <ListApp />
  </ActionProvider>
);
