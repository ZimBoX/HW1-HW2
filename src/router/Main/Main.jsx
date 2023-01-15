import { useState, useEffect } from 'react';

import './Main.css';

import Button from '../../Components/Button/Button';

function Main() {

    const [playAnim, sePlayAnim] = useState(false);

    return (
        <div className="Main">
            <Button 
                type = "Button"
                text = "Задания"
                state = { sePlayAnim }
                request = { true }
            />
        </div>
    );
}

export default Main;