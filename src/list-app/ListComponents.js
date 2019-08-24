import React, { useRef, useContext } from "react";

import ListContext from "./ListContext";

function ItemStats() {
  const { products } = useContext(ListContext);
  return <div>Count is: {products.length}</div>;
}

const Form = props => {
  const addInput = useRef();
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        const item = {
          name: addInput.current.value,
          id: Date.now()
        };
        props.addItem(item);
        addInput.current.value = "";
      }}
    >
      <input ref={addInput} />
    </form>
  );
};

const ItemList = props => (
  <table>
    <thead>
      <tr>
        <th>
          <ItemStats />
        </th>
      </tr>
    </thead>
    <tbody>
      {props.products.map(i => (
        <tr key={i.id}>
          <td className="table-data">
            <span>{i.name}</span>
          </td>
          <td className="table-control">
            <button onClick={() => props.removeItem(i.id)}>x</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const ActionButton = props => {
  return (
    <button
      onClick={() => {
        const item = {
          name: "test item",
          id: Date.now()
        };
        props.action(item);
      }}
    >
      Add
    </button>
  );
};

export { Form, ItemList, ActionButton };
