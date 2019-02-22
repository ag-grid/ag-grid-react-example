import React, {useReducer} from "react";
import GridComponent from "./GridComponent";

import {Context, initialState, reducer} from "./store";

export default function SimpleReduxHookExample() {
    const [store, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{store, dispatch}}>
            <div>
                <h1>Simple Example using Hooks (with useContext and useReducer)</h1>
                <button onClick={() => dispatch({type: "SET_ROW_DATA"})}>Populate Row Data</button>
                <GridComponent/>
            </div>
        </Context.Provider>
    )
}
