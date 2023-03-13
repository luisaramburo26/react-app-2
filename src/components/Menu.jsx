import {useState, useEffect} from 'react';
import { MdExitToApp } from 'react-icons/md';
import Cookies from 'universal-cookie';
import ModalSalir from './modal/ModalSalir';
import Mme from './options/mme/Mme';
import Opcion2 from './options/opcion2/Opcion2';
import Home from './Home';
import Preload from './modal/Preload';



function Menu(){

    const [ estadoMenuHamburger, setEstadoMenuHamburger ] = useState('')
    const [ estadoModalSalir, setEstadoModalSalir ] = useState(false)
    const [ estadoMenu, setEstadoMenu ] = useState('0px')
    const [ estadoContenido, setEstadoContenido ] = useState(<Home/>)

    const cookie = new Cookies();
    const user = cookie.get('user')

    const fechaActual = new Date().getTime();
    const fechaVencimiento = new Date('2023-03-20').getTime();
    const diasRestantes = Math.trunc((fechaVencimiento - fechaActual)/(1000*60*60*24))
    
    const handleClickSalir = () => {
        setEstadoModalSalir(true)
    }

    const handleClickDesplegarMenu = () => {

        if (estadoMenu == "200px" ){
            setEstadoMenu("0px")
            setEstadoMenuHamburger('')
        } else {
            setEstadoMenu("200px")
            setEstadoMenuHamburger('trans')
        }
    }

    useEffect(() => {
        if (estadoMenu == "200px" ){
            handleClickDesplegarMenu()
        } 
      }, [estadoContenido]);

    return <>
        <section className='header-menu'>
            <div className='btn-menu'>
                <div className={`menuHamburger ${estadoMenuHamburger}`} onClick={ handleClickDesplegarMenu }>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </div>
            <div className='titulo-menu'>
                <h1></h1>
            </div>

            <div className='cerrar-sesion'>
                <div className='txt-sesion' >
                    <div className='txt-usuario'>{ user }</div>
                    <div className='txt-dias'> Expires in { diasRestantes } days</div>
                </div>
                <MdExitToApp className='icon-exit' onClick={ handleClickSalir }/>
            </div>
        </section>
        <section className='container-menu'>
            <div className='menu-desplegable' style={{width: estadoMenu}}>
                <ul className='menu-opciones'>
                    <li onClick={()=>setEstadoContenido(<Home/>)}> HOME </li>
                    <li onClick={()=>setEstadoContenido(<Mme/>)}> BT-MME </li>
                    <li onClick={()=>setEstadoContenido(<Opcion2/>)}> OPCION 2 </li>
                </ul>
            </div>
            <div className='menu-contenido'>
                {estadoContenido}
            </div>
        </section>
        <ModalSalir
            estado={estadoModalSalir}
            cambiarestado={setEstadoModalSalir}
        />

    </>
}

export default Menu