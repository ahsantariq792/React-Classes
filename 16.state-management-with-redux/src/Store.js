import { createStore } from "redux";
import Reducer from "./state/reducers";


const store = createStore( Reducer)


export default store;