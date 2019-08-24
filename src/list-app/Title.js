import React from "react";

const TitleContext = React.createContext("");

function TitleProvider() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const timerID = setTimeout(() => {
      setCount(count + 1);
    }, 1000);
    return () => {
      clearTimeout(timerID);
    };
  }, [count]);

  return (
    <TitleContext.Provider value={"List App with Count: " + count}>
      <Title />
    </TitleContext.Provider>
  );
}

function Title() {
  const value = React.useContext(TitleContext);
  return <h2>{value}</h2>;
}

export default TitleProvider;
