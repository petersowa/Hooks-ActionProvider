import React, { useRef, useEffect, useState, useContext } from "react";
import ReactDOM from "react-dom";
import Title from "./Title";
import { ActionProvider } from "./DataProvider";
import mutations from "./mutations";
import "./styles.css";

const ListContext = React.createContext();

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

const ItemList = props => {
  // console.log("list item", props);

  return (
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
};

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

function ItemStats() {
  const { products } = useContext(ListContext);
  return <div>Count is: {products.length}</div>;
}

function ListApp() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setError] = useState("");

  const { actions, products } = useContext(ListContext);
  const { addItem, removeItem } = actions;

  // console.log({actions})

  useEffect(() => {
    const { fetchData, addItems } = actions;
    fetchData({ addItems, setIsLoading, setError });
    // disable eslint warning
    // useEffect is being used to fetch data on component
    // mount only with no dependency updates needed
    // eslint-disable-next-line
  }, []);

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

function App() {
  return (
    <ActionProvider Context={ListContext} mutations={mutations}>
      <ListApp />
    </ActionProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
