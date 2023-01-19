import { useState, useEffect } from "react";

import { Outlet, Link } from "react-router-dom";
import axios from "axios";

import "./HW2.css";

function HW2(){

    const [auth, setAuth] = useState(false);
    const [axiosURL, setAxiosURL] = useState([]);
    const [logout, setLogout] = useState();

    useEffect(() => {
        if (axiosURL.length === 0) {
            axios
            .post("../php/Authсheck.php")
            .then(function (response) {
                setAxiosURL(response.request.responseURL);
                return;
            })
            .catch(function () {
                setAxiosURL("http://hw1.box/Authсheck.php");
                return;
            });
            axios
            .post("../php/Logout.php")
            .then(function (response) {
                setLogout(response.request.responseURL);
                return;
            })
            .catch(function () {
                setLogout("http://hw1.box/Logout.php");
                return;
            });
        }
        else {
            axios.post(axiosURL).then(function(response){
                setAuth(response.data);
                return;
            })
        }
    }, [axiosURL]);

    function reload(){
        axios.post(logout,{logout: true}).then( () => {
            window.location.reload();
            return;
        } )
    }

    return (
        <div className="HW2">
            <header>
                <nav>
                    <div>
                        <Link to={`/HW2/HomePage`}>Главная</Link>
                    </div>
                    <div>
                        <Link to={`/HW2/Galery`}>Галерея</Link>
                    </div>
                    {auth
                    ? <div>
                        <a href="#" onClick={ () => { reload() } } >Выйти</a>
                      </div>
                    : <div>
                        <Link to={`/HW2/Login`}>Войти</Link>
                      </div>
                    }
                </nav>
            </header>
            
            <Outlet />
        </div>
    )
}

export default HW2;