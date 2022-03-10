import logo from './logo.svg';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import {increment, decrement} from "./state/actions/actions"

function App() {
  const myState = useSelector ((state)=>state.changenumber)
  const dispatch = useDispatch ()
  return (
    <div className="container">
      <h1>Redux</h1>
      <h1>Increment Decrement</h1>
      
      <button onClick={()=> dispatch(increment())} className="btnClass">+</button>
      <input className="inputClass" value = {myState}/>
      <button onClick={()=> dispatch(decrement())} className="btnClass" >-</button>
    </div>
  );
}

export default App;
