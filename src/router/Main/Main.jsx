import { useState } from 'react';

import './Main.css';

import Button from '../../Components/Button/Button';
import NavButtons from '../../Components/NavButtons/NavButtons';

const nav = [
    ["Задание 1", "HW1", "Button"],
    ["Задание 2", "HW2/HomePage", "Button"]
]

function Main() {

    const [playAnim, sePlayAnim] = useState(false);

    return (
        <div className="Main">
            <div className='MainButton'>
                <Button 
                    type = "Button"
                    text = "Задания"
                    state = { sePlayAnim }
                    request = { true }
                />
            </div>
            {
                playAnim
                ? <NavButtons 
                buttons = { nav }
                state = { sePlayAnim }
                request = { false }
                />
                :<div></div>
            }
        </div>
    );
}

export default Main;