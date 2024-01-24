import React from 'react';
import "../CSS/Testimonial.css";


function Popup(props) {
    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <button className='close' onClick={() => props.setTrigger(false)}> x </button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup
