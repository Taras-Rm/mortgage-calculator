import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [selected, setSelected] = useState("banks");

    return (
        <nav className="blue navbar">
            <div className="nav-wrapper container">
                <Link onClick={() => setSelected("banks")} to="/banks" className="brand-logo right">BankingPRO</Link>
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li onClick={() => setSelected("banks")} className={`${selected === "banks" ? "active" : ""}`}><Link to="/banks" className="fontSize" >Banks management</Link></li>
                    <li onClick={() => setSelected("calculator")} className={`${selected === "calculator" ? "active" : ""}`}><Link to="/calculator" className="fontSize" >Mortgage calculator</Link></li>                  
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
