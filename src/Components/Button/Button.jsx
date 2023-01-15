
import "./Button.css"

function Button(props){
    
    const {type, text, href, state, request} = props;
    // type - Button/Submit
    // text - text
    // href - link to the page
    // state - function reference
    // request - function request
    // !it is worth using only a couple of state request or href!
    
    return(
        <div className="buttonWrapper">
            { href
            ?   <button type={ type } className="hrefButton" >
                    <a href={ href }>{ text }</a>
                </button>
            :   <button type={ type } className="stateButton" onClick={ () => { state(request) } }>
                    <p>{ text }</p>
                </button>
            }
        </div>
    )
}