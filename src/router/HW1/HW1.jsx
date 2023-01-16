import axios from "axios";

import "./HW1.css";

function HW1() {
  axios
    .post('/php/functions.php', {
      firstName: "Fred",
      lastName: "Flintstone",
    })
    .then(function (response) {
      console.log(response);
    });
}

export default HW1;
