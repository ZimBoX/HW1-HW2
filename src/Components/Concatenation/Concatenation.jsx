import { useState, useEffect, useRef } from 'react';

import axios from "axios";

import "./Concatenation.css";

import Button from '../Button/Button';

function Concatenation(){
    
    const [axiosURL, setAxiosURL] = useState([]);
    const [result, setResult] = useState(false);

    let Name = useRef();
    let Age = useRef();

    useEffect( () => {
        if (axiosURL.length === 0){
            axios.post('php/Concatenation.php')
            .then(function (response) {
                setAxiosURL(response.request.responseURL);
                return;
            })
            .catch(function () {
                setAxiosURL("http://hw1.box/Concatenation.php");
                return;
            });
        }
    }, [axiosURL] )

    function send(){
        let userName = Name.current.value;
        let userAge = Age.current.value
        if (userName === "" && userAge === ""){
            Name.current.className = "inputEror";
            Age.current.className = "inputEror";
        }
        else if (userName === ""){
            Name.current.className = "inputEror";
            Age.current.className = "";
        }
        else if (userAge === ""){
            Age.current.className = "inputEror";
            Name.current.className = "";
        }
        else{
            Age.current.className = "";
            Name.current.className = "";
            axios.post(axiosURL, {
                Name: userName,
                Age: userAge
              })
              .then(function (response) {
                setResult(response.data)
              })
        };
    }

    return(
        <div className='concatenationWrapper'>
            { (!result)
                ?   <div className='concatenationForm'>
                        <form name='NameAge' onSubmit={ (event) => { event.preventDefault(); send() } }>
                            <input type="text" ref={ Name } placeholder="Ваше имя"/>
                            <input type="text" ref={ Age } placeholder="Ваш возраст"/>
                            <div className='concatenationButton'>
                                <Button 
                                    text="Отправить"
                                    type="submit"
                                    state={ () => {} }
                                />
                            </div>
                        </form>
                    </div>
                : <div className='concatenationResult'>
                    <h2 dangerouslySetInnerHTML={ { __html: result } } ></h2>
                </div>
            }
        </div>
    )

}

export default Concatenation;