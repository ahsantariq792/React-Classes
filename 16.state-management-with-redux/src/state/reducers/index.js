import changenumber from "./updown";
import { combineReducers } from "redux";

const Reducer = combineReducers ({
    changenumber,  //List of all Reducers we can export only one reducer to main app so we combine all reducers and export it
})

export default Reducer;