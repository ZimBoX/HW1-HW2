import { useState, useEffect } from 'react';

import axios from "axios";

import "./HW1.css";

function HW1() {

    const [axiosURL, setAxiosURL] = useState([]);

    useEffect( () => {
        if (axiosURL.length === 0){
            axios.get('php/functions.php')
            .then(function (response) {
                setAxiosURL(response.request.responseURL);
                return;
            })
            .catch(function () {
                setAxiosURL("http://hw1.box/functions.php");
                return;
            });
        }
    }, [] )

}

export default HW1;
