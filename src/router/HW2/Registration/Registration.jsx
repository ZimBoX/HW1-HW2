import { useState, useEffect, useRef } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import crypto from "crypto-js";

import "./Registration.css";

function Registration() {

    const [axiosURL, setAxiosURL] = useState([]);
    const [message, setMessage] = useState("");
  
    let Login = useRef();
    let Password = useRef();
    let Email = useRef();

    useEffect(() => {
        if (axiosURL.length === 0) {
            axios
            .post("../php/Registration.php")
            .then(function (response) {
                setAxiosURL(response.request.responseURL);
                return;
            })
            .catch(function () {
                setAxiosURL("http://hw1.box/Registration.php");
                return;
            });
      }
    }, [axiosURL]);

    function userReg(){
        let userLogin = Login.current.value;
        let userPassword = Password.current.value;
        let userEmail = Email.current.value;
        
        
        let hashUserLogin = crypto.MD5(userLogin).toString();
        let hashuserPassword = crypto.MD5(userPassword).toString();

        if(userLogin === "") Login.current.className = "inputEror";
        if(userPassword === "") Password.current.className = "inputEror";
        if(userEmail === "") Email.current.className = "inputEror";
        
        if(userLogin !== "" && userPassword !== "" && userEmail !== ""){
            
            Login.current.className = "";
            Password.current.className = "";
            Email.current.className = "";
            
            axios.post(axiosURL,{
                login: hashUserLogin,
                password: hashuserPassword,
                email: userEmail

            }).then( (response) => {
                if(response.data === "clone"){
                    setMessage("Потзователь с таким логином уже существует");
                }
                else{
                    window.location.href = "/hw2/login"
                }
            } )
        }

       
    }

    return (
        <div className="Registration" onSubmit={ (event) => {event.preventDefault(); userReg();
          }}>
            <form id="HW2Registration">
                <input type="text" name="Login" ref={ Login } placeholder="Логин" />
                <input type="password"  name="Password" ref={ Password } placeholder="Пароль" />
                <input type="email" name="Email" ref={ Email } placeholder="Почта" />
                <button type="submit"><p>Регистрация</p></button>
                <h3>
                    { message }
                </h3>
                <h2>
                    Есть аккаунт? <Link to={`/HW2/Login`}>Войти</Link>
                </h2>
            </form>
        </div>
    );
}

export default Registration;