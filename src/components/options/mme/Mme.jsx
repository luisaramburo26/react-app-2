import {useState, useEffect} from 'react';
import BackTesting from './BackTesting';
import Bot from './Bot';

function Mme(props) {
    
    const [ estadoContenido, setEstadoContenido ] = useState(<BackTesting/>)

    return <>
        <div className="contenedor-MME">
            <ul className="opciones-mme">
                <li onClick={()=>setEstadoContenido(<BackTesting/>)}>Back-Testing</li>
                <li onClick={()=>setEstadoContenido(<Bot/>)}>BOT</li>
            </ul>
        </div>
        {estadoContenido}
    </>
}

export default Mme