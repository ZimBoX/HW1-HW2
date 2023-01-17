import { useState, useEffect, useRef } from 'react';

import axios from "axios";

import "./Changer.css";

import Button from '../Button/Button';

function Changer(){
    
    const [axiosURL, setAxiosURL] = useState([]);

    let VarA = useRef();
    let VarB = useRef();

    useEffect( () => {
        if (axiosURL.length === 0){
            axios.post('php/Changer.php')
            .then(function (response) {
                setAxiosURL(response.request.responseURL);
                return;
            })
            .catch(function () {
                setAxiosURL("http://hw1.box/Changer.php");
                return;
            });
        }
    }, [axiosURL] )

    function send(){
        let userVarA = VarA.current.value;
        let userVarB = VarB.current.value
        if (userVarA === "" && userVarB === ""){
            VarA.current.className = "inputEror";
            VarB.current.className = "inputEror";
        }
        else if (userVarA === ""){
            VarA.current.className = "inputEror";
            VarB.current.className = "";
        }
        else if (userVarB === ""){
            VarB.current.className = "inputEror";
            VarA.current.className = "";
        }
        else{
            VarB.current.className = "";
            VarA.current.className = "";
            axios.post(axiosURL, {
                VarA: userVarA,
                VarB: userVarB
              })
              .then(function (response) {
                let result = response.data.split("|");
                VarA.current.value = result[0];
                VarB.current.value = result[1];
              })
        };
    }

    return(
        <div className='ChangerWrapper'>
            <div className='ChangerForm'>
                <form name='VarAVarB' onSubmit={ (event) => { event.preventDefault(); send() } }>
                    <input type="text" ref={ VarA } placeholder="A"/>
                    <div className='ChangerButton'>
                    <button type='submit'>
                        <img src="./switch.svg" alt="" />
                    </button>
                    </div>
                    <input type="text" ref={ VarB } placeholder="B"/>
                </form>
            </div>
        </div>
    )

}

export default Changer;