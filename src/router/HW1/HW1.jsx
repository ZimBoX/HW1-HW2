
import "./HW1.css";

import Concatenation from '../../Components/Concatenation/Concatenation';
import Сalculator from "../../Components/Сalculator/Сalculator";
import Changer from "../../Components/Changer/Changer";
import Test from "../../Components/Test/Test";
import CreateBlock from "../../Components/CreateBlock/CreateBlock";

function HW1() {

    return(
        <div className="HW2Wrapper">
            <h2>1)</h2>
            <Concatenation />
            <h2>2)</h2>
            <Сalculator />
            <h2>3)</h2>
            <Changer />
            <h2>4)</h2>
            <Test />
            <h2>5)</h2>
            <CreateBlock />
        </div>
    )
}

export default HW1;
