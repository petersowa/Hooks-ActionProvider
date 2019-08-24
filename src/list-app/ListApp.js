import React, { useState, useContext, useCallback, useEffect } from "react";

import Title from "./Title.js";
import { Form, ActionButton, ItemList } from "./ListComponents";
import ListContext from "./ListContext";

function ListApp() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setError] = useState("");

  const { actions, products } = useContext(ListContext);
  const { addItem, removeItem } = actions;

  function loadData() {
    const { fetchData, addItems } = actions;
    fetchData({ addItems, setIsLoading, setError });
  }

  const initialLoad = useCallback(loadData, []);

  useEffect(() => {
    initialLoad();
  }, [initialLoad]);

  console.log("ListApp");

  return errorMessage ? (
    <div>{errorMessage}</div>
  ) : (
    <div className="App">
      <Title />
      <Form addItem={addItem} />
      {isLoading ? (
        <div className="loading-spinner">loading</div>
      ) : (
        <>
          <ItemList removeItem={removeItem} products={products} />
        </>
      )}
      <ActionButton action={addItem} />
    </div>
  );
}

export default ListApp;
