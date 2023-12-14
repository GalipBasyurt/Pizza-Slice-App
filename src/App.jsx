import { useMemo, useReducer } from "react";
import "./App.css";

const initialState = {
  numberOfPeople: 0,
  slicesPerPerson: 0,
  slicesPerPizza: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "NUMBER_OF_PEOPLE_CHANGE":
      return {
        ...state,
        numberOfPeople: action.payload,
      };

    case "SLICES_PER_PERSON_CHANGE":
      return {
        ...state,
        slicesPerPerson: action.payload,
      };

    case "SLICES_PER_PIZZA_CHANGE":
      return {
        ...state,
        slicesPerPizza: action.payload,
      };

    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  const calculateResults = useMemo(() => {
    const result = Math.ceil(
      (state.numberOfPeople * state.slicesPerPerson) / state.slicesPerPizza
    );

    if (isNaN(result) || result === Infinity) {
      return "";
    }

    return result;
  }, [state.numberOfPeople, state.slicesPerPerson, state.slicesPerPizza]);

  return (
    <div>
      <div className="container">
        <div className="container-image">
          <h1>Pizza Calculator App</h1>

          <img
            src="https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*"
            alt="#"
          />
        </div>
        <div className="container-inputs">
          <h1>{`${calculateResults || 0}`} pizza needed</h1>
          <label>Number of Poble</label>
          <input
            type="number"
            min="1"
            max="50"
            placeholder="Number of People"
            value={state.numberOfPeople || 0}
            onChange={(e) =>
              dispatch({
                type: "NUMBER_OF_PEOPLE_CHANGE",
                payload: +e.target.value,
              })
            }
          />
          <label>Slices Per Person</label>
          <input
            type="number"
            min="1"
            max="50"
            placeholder="Slices Per Person"
            value={state.slicesPerPerson || 0}
            onChange={(e) =>
              dispatch({
                type: "SLICES_PER_PERSON_CHANGE",
                payload: +e.target.value,
              })
            }
          />
          <label>Total Slices of Pizza</label>
          <input
            type="number"
            min="1"
            max="50"
            placeholder="Total Slices of Pizza"
            value={state.slicesPerPizza || 0}
            onChange={(e) =>
              dispatch({
                type: "SLICES_PER_PIZZA_CHANGE",
                payload: +e.target.value,
              })
            }
          />
        </div>
      </div>
    </div>
  );
}

export default App;
