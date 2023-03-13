import {useState} from 'react';
import Cookies from 'universal-cookie';



function ModalSalir(props){

    const handleClickSalir = async(e) => {
        const cookie = new Cookies();
        cookie.remove('user', { path: '/' });
        window.location.href=''
    }

    return <>
        {props.estado &&
            <div className='overlay'>
                <div className='container-modal'>
                    <div className='encabezado-modal'><h3>SALIR</h3></div>
                    <div className='btn-cerrar' onClick={() => props.cambiarestado(false)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>
                    <div className='contenido-modal'>
                        <h1>Cerrar sesion</h1>
                        <div className='btn-salir'>
                            <button onClick={ handleClickSalir }>Aceptar</button>
                            <button onClick={() => props.cambiarestado(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        }
    </>
}

export default ModalSalir