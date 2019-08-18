import axios from "axios";

export async function getData({ addItems, setIsLoading, setError }) {
  console.log("get data");
  try {
    const result = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    addItems(result.data);
    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
    setError("Error loading items: " + error.message);
  }
}

export default {
  addItem(state, mutation) {
    const { payload } = mutation;
    console.log("addItem ", payload);
    return [...state, payload];
  },
  removeItem(state, mutation) {
    const { payload } = mutation;
    console.log("removeItem ", state.length, payload);
    return state.filter(i => i.id !== payload);
  },
  addItems(state, mutation) {
    const { payload } = mutation;
    console.log("added ", performance.now(), state.length, payload.length);
    return payload;
  },
  fetchData(state, { payload }) {
    getData(payload);
    return state;
  }
};
