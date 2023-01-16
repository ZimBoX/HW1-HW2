import { useState, useEffect, useRef } from 'react';

import axios from "axios";

import "./Сalculator.css";

import Button from '../Button/Button';

function Сalculator(){
    
    const [axiosURL, setAxiosURL] = useState([]);
    const [result, setResult] = useState(false);

    let Expression = useRef();

    useEffect( () => {
        if (axiosURL.length === 0){
            axios.post('php/Сalculator.php')
            .then(function (response) {
                setAxiosURL(response.request.responseURL);
                return;
            })
            .catch(function () {
                setAxiosURL("http://hw1.box/Сalculator.php");
                return;
            });
        }
    }, [] )
    function send(){
        let userExpression = Expression.current.value;
        if (userExpression === ""){
            Expression.current.className = "inputEror";
        }
        else{
            Expression.current.className = "";
            axios.post(axiosURL, {
                Expression: userExpression,
              })
              .then(function (response) {
                setResult(response.data)
              })
        };
    }

    return(
        <div className='СalculatorWrapper'>
            { (!result)
                ?   <div className='СalculatorForm'>
                        <form name='ExpressionAge' onSubmit={ (event) => { event.preventDefault(); send() } }>
                            <input type="text" ref={ Expression } placeholder="Введите выражение"/>
                            <div className='СalculatorButton'>
                                <Button 
                                    text="Посчитать"
                                    type="submit"
                                    state={ () => {} }
                                />
                            </div>
                        </form>
                    </div>
                : <div className='СalculatorResult'>
                    <h2 dangerouslySetInnerHTML={ { __html: result } } ></h2>
                </div>
            }
        </div>
    )

}

export default Сalculator;