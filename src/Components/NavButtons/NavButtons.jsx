import { useEffect, useState } from 'react';

import "./NavButtons.css";

import Button from "../Button/Button";

function NavButtons(props){

    const {buttons, state, request} = props;
    // buttons - array contraining arrays form: [text, href, type]

    const [render, setRender] = useState();

    useEffect( () => {
        setRender(
            buttons.map(f => {

                const [text, href, type] = f;
                return (
                    <Button 
                        text = { text }
                        href = { href }
                        type = { type }
                    />
                )
            })
        )
    }, [buttons] )

    return(
        <div className="NavWrapper" onClick={ () => { state(request) } }>
            { render }
        </div>
    )
}

export default NavButtons;