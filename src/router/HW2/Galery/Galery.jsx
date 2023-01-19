import { useState, useEffect } from "react";

import axios from "axios";

import "./Galery.css";

function Galery(){

    const [auth, setAuth] = useState("");
    const [axiosURL, setAxiosURL] = useState([]);

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
        }
        else {
            axios.post(axiosURL).then(function(response){
                setAuth(response.data);
                return;
            })
        }
    }, [axiosURL]);

    return(
        <div className="Galery">
            {(auth !== "")
            ?auth
                ? <h1>Galery private content</h1>
                : <h1>Для просмотра контента, необходимо авторизоваться.</h1>
            : <div></div>
            }
        </div>
    )
}

export default Galery;