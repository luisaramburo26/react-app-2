import {useState} from 'react';
import Cookies from 'universal-cookie';
import axios from "axios";
import Modal from './Modal'
import Preload from './Preload';
import config from '/config'

function ModalIniciar(props){

    const [ estadoModal, setEstadoModal ] = useState(false)
    const [ estadoPreload, setEstadoPreload ] = useState(false)
    const [ tituloModal, setTituloModal ] = useState('')
    const [ textoModal, setTextoModal ] = useState('')

    const handleClickIniciar = async(e) => {
        const cookie = new Cookies();
        const user = cookie.get('user')

        props.cambiarestado(false)
        setEstadoPreload(true)

        const payloadToken =  {
            "username": user,
        }

        const token = await axios.post(config.REACT_APP_API_URL + '/getToken',payloadToken)
        if (token.status == 200){
            const headers = {
                headers: {
                    'Authorization': `Basic ${token.data}`
                }
            }
            const start = await axios.post(config.REACT_APP_API_URL + '/start',props.data,headers)
            if(start.data == 1){
                setEstadoPreload(false)
                setTituloModal("MENSAJE")
                setTextoModal("Operacion abierta con exito")
                setEstadoModal(true)
                props.actualizarLog()
                props.re.current.scrollTop = props.re.current.scrollHeight
            } else {
                setEstadoPreload(false)
                setTituloModal("MENSAJE")
                setTextoModal("Ocurrio un error al abrir la operacion")
                setEstadoModal(true)
                props.actualizarLog()
                props.re.current.scrollTop = props.re.current.scrollHeight
            }
        }
    }

    return <>
        {props.estado &&
            <div className='overlay'>
                <div className='container-modal'>
                    <div className='encabezado-modal'><h3>MENSAJE</h3></div>
                    <div className='btn-cerrar' onClick={() => props.cambiarestado(false)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>
                    <div className='contenido-modal'>
                        <h1>Abrir Operacion</h1>
                        <div className='btn-salir'>
                            <button onClick={ handleClickIniciar }>Aceptar</button>
                            <button onClick={() => props.cambiarestado(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        }
        <Modal
            estado={estadoModal}
            cambiarestado={setEstadoModal}
            titulo= {tituloModal}
            texto={textoModal}
        />
        <Preload
            estado={estadoPreload}
        />
    </>
}

export default ModalIniciar