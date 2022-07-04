import React from "react";
import waldopic from '../assets/waldo.jpg';
import wendapic from '../assets/waldowoman.jpg';
import wizardpic from '../assets/wizardwhitebeard.jpeg';
import beemanpic from '../assets/beeman.jpg';
import './startpage.css';
import { Link } from "react-router-dom";

function Startpage(){

    return(
    <div id="startpage">
        <h2>Find Waldo and all his companions!</h2>
        <div className="cardHolder">
            <div className="characterCard">
                <img src={waldopic} alt="waldo"/>
                <p>Waldo</p>
            </div>
            <div className="characterCard">
                <img src={wendapic} alt="wenda"/>
                <p>Woman Waldo</p>
            </div>
            <div className="characterCard">
                <img src={wizardpic} alt="wizard"/>
                <p>Wizard Whitebeard</p>
            </div>
            <div className="characterCard">
                <img src={beemanpic} alt="bee waldo"/>
                <p>Beeman</p>
            </div>
        </div>
        <div className="buttonholder">
            <Link to="/gamepage"><button type="button">Start Game</button> </Link>
        </div>
    </div>
    );
}
export default Startpage;