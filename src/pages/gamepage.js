import React, { useEffect, useState } from "react";
import waldomap from '../assets/waldolocation.jpg';
import './gamepage.css';
import {doc,onSnapshot} from 'firebase/firestore';

function Gamepage(props){
    const [lastchar, setlastchar] = useState(null);
    const [waldo, setwaldo] = useState(false);
    const [beeman, setbeeman] = useState(false);
    const [wizard, setwizard] = useState(false);
    const [woman, setwoman] = useState(false);
    const [time, settime] = useState(0);
    const [intervalval, setintervalval] = useState(null);
    const [allcoords, setallcoords] = useState(null);

    
    
    const initFireBase = () =>{
        const docRef = doc(props.db, 'winterwaldo','22TT01FdxInFMhY3NyiT');
        onSnapshot(docRef, (doc)=>{
            setallcoords(doc.data());
    });
    }
    useEffect(()=>{
        settime(0);
    }, [allcoords])
    

    useEffect(()=>{
        setwaldo(false);
        setbeeman(false);
        setwizard(false);
        setwoman(false);
        initFireBase();
        const interval = setInterval(() => {
            settime((prev)=>prev+1);
        }, 1000);
        setintervalval(interval);
        settime(0);
        return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(()=>{
        gamecheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [waldo, beeman, wizard, woman]);

    const gamecheck = () =>{
        if(waldo && beeman && wizard && woman){
            const finishedmodal = document.getElementById('finished');
            const text = finishedmodal.querySelector('#text');
            text.replaceChildren(`GAME WON, YOU FOUND THEM ALL IN ${time} SECONDS!`);
            finishedmodal.style.display='flex';
            clearInterval(intervalval);
            setintervalval(null);
        }
    }


    const characterclick = (e) =>{
        const modal = document.getElementById('characterchoice');
        modal.style.display = 'none';
        switch (e.target.id) {
        case 'waldobutton':
            if(lastchar==='waldo'){
                setwaldo(true);
                feedback(true);
            }
            else{
                feedback(false);
            }
            break;
        case 'beemanbutton':
            if(lastchar==='beeman'){
                setbeeman(true);
                feedback(true);
            } 
            else{
                feedback(false);
            }
            break;
        case 'wizardbutton':
            if(lastchar==='wizard'){
                setwizard(true);
                feedback(true);
            }
            else{
                feedback(false);
            }
            break;
        case 'womanwaldobutton':
            if(lastchar==='woman'){
                setwoman(true);
                feedback(true);
            }
            else{
                feedback(false);
            }
            break;
        default:
            console.log(`Character choice button error`);
        }
        setlastchar(null);
    }

    const correct = (e) =>{
        e.preventDefault();
        switch (e.target.alt) {
            case 'waldo':
                setlastchar('waldo');
                break;
            case 'beeman':
                setlastchar('beeman');
                break;
            case 'wizard':
                setlastchar('wizard');
                break;
            case 'waldowoman':
                setlastchar('woman');
                break;
            default:
                console.log(`Character area error`);
            }
    }
    const register = (e) =>{
        e.preventDefault();
        if(e.target.tagName!=='AREA'){
            setlastchar(null);
        }
        const coordx = e.clientX;
        const coordy = e.clientY;
        charactermodal(coordx, coordy);
    }

    //modal functions

    const charactermodal = (x,y) =>{
        const modal = document.getElementById('characterchoice');
        modal.style.top = y + 'px';
        modal.style.left = x + 'px';
        modal.style.position= 'absolute';
        modal.style.display = modal.style.display!=='flex' ? 'flex' : 'none';
    }
    const removeModal = () =>{
        const finishedmodal = document.getElementById('finished');
        finishedmodal.style.display='none';
    }

    const feedback = (result) =>{
        const feedbackdiv = document.getElementById('feedback');
        if(result===true){
            feedbackdiv.textContent='You found a friend!';
            feedbackdiv.style.backgroundColor='green';
            feedbackdiv.style.color='white';
            feedbackdiv.style.display='flex';
            setTimeout(() => {
                feedbackdiv.style.display='none';
            }, 3000);
        }
        else if(result===false){
            feedbackdiv.textContent='Wrong';
            feedbackdiv.style.backgroundColor='red';
            feedbackdiv.style.color='white';
            feedbackdiv.style.display='flex';
            setTimeout(() => {
                feedbackdiv.style.display='none';
            }, 3000);
        }
        else{
            console.log('Feedback error');
        }

    }
    return(
        <div id="gamepage">
            <h2><span id="question">Where are they? </span> <span id="checklist"><span>Waldo: {waldo? 'Found' : 'Lost'}</span><span> Beeman: {beeman? 'Found' : 'Lost'} </span><span>Woman Waldo: {woman? 'Found' : 'Lost'}</span><span> Wizard: {wizard? 'Found' : 'Lost'} </span></span></h2>
            {allcoords!==null? 
            <div id="container">
                <img src={waldomap} alt="where is waldo map" useMap="#characters" onClick={register}/>
                <map name="characters" onClick={register}>
                    <area alt="wizard" id="wizard" coords={allcoords.wizard} shape="rect" onClick={correct}/>
                    <area alt="beeman" id="beeman" coords={allcoords.beeman} shape="rect" onClick={correct}/>
                    <area alt="waldowoman" id="waldowoman" coords={allcoords.woman} shape="rect" onClick={correct}/>
                    <area alt="waldo" id="waldo" coords={allcoords.waldo} shape="rect" onClick={correct}/>
                </map>
                <div id="characterchoice">
                    <button id="waldobutton" onClick={characterclick}>Waldo</button>
                    <button id="beemanbutton" onClick={characterclick}>Beeman</button>
                    <button id="wizardbutton" onClick={characterclick}>Wizard</button>
                    <button id="womanwaldobutton" onClick={characterclick}>Woman Waldo</button>
                </div>
                <div id="finished">
                    <div id="text"></div>
                    <button onClick={removeModal}>Yay!</button>
                </div>
                <div id="feedback">
                </div>
                <div id="timer">
                    {time}
                </div>
            </div>:
            <div>Page Loading</div>}
        </div>
    );
}
export default Gamepage;