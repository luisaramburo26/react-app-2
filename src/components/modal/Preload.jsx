import {useState} from 'react'


function Preload(props){
    return <>
        {props.estado &&
            <div className="preloader">
                <div className="loader"></div>
            </div>
        }
    </>
}

export default Preload