import React from "react";
import '../App.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function Navbar() {


    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link className="item" exact to="/">Home</Link>
                    </li>
                    <li>
                        <Link  className="item" to="/about">About</Link>
                    </li>
                    <li>
                        <Link className="item" to="/contact">Contact</Link>
                    </li>

                </ul>
            </nav>
        </div>
    );

}
export default Navbar;