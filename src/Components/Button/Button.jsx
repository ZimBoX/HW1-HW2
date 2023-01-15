
import "./Button.css";

function Button(props){
    
    const {type, text, href, state, request} = props;
    // type - Button/Submit
    // text - text
    // href - link to the page
    // state - function reference
    // request - function request
    // !it is worth using only a couple of state request or href!
    
    return(
        <div>
            { href
            ?   <div className="hrefButtonWrapper">
                    <button type={ type } className="hrefButton" onClick={ () => { window.location.href = href } }>
                        <p>{ text }</p>
                    </button>
                </div>
            :   <div className="stateButtonWrapper">
                    <button type={ type } className="stateButton" onClick={ () => { state(request) } }>
                        <p>{ text }</p>
                    </button>
                </div>
            }
        </div>
    )
}

export default Button;