import { useState, useEffect, useRef } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import crypto from "crypto-js";

import "./Login.css";

function Login() {

    const [axiosURL, setAxiosURL] = useState([]);
    const [message, setMessage] = useState("");
  
    let Login = useRef();
    let Password = useRef();

    useEffect(() => {
        if (axiosURL.length === 0) {
            axios
            .post("../php/Login.php")
            .then(function (response) {
                setAxiosURL(response.request.responseURL);
                return;
            })
            .catch(function () {
                setAxiosURL("http://hw1.box/Login.php");
                return;
            });
      }
    }, [axiosURL]);

    function send(){
        let userLogin = Login.current.value;
        let userPassword = Password.current.value;
        let hashUserLogin = crypto.MD5(userLogin).toString();
        let hashuserPassword = crypto.MD5(userPassword).toString();

        if(userLogin === "") Login.current.className = "inputEror";
        if(userPassword === "") Password.current.className = "inputEror";
        if(userLogin !== "" && userPassword !== ""){
            
            Login.current.className = "";
            Password.current.className = "";
            
            axios.post(axiosURL,{
                login: hashUserLogin,
                password: hashuserPassword
            }).then( (response) => {
                if(response.data === "done"){
                    window.location.href = "/hw2/homepage"
                }
                else{
                    setMessage("Неверный логин/пароль")
                }
            } )
        }

       
    }

    return (
        <div className="Login" onSubmit={(event) => {event.preventDefault(); send();
          }}>
            <form id="HW2Login">
                <input type="text" name="Login" ref={ Login } placeholder="Логин" />
                <input type="password"  name="Password" ref={ Password } placeholder="Пароль" />
                <button type="submit"><p>Войти</p></button>
                <h3>
                    { message }
                </h3>
                <h2>
                    Нет аккаунта? <Link to={`/HW2/Registration`}>Регистрация</Link>
                </h2>
            </form>
        </div>
    );
}

export default Login;
