import Modal from './modal/Modal'
import {useState, useContext} from 'react'
import axios from "axios";
import {DataContext} from '../contexts/dataContext'
import Cookies from 'universal-cookie';
import config from '/config'


function Login(props){

    const contextData = useContext(DataContext)
    
    const [ inputUsername, setInputUsername ] = useState('')
    const [ inputPassword, setInputPassword ] = useState('')
    const [ estadoModal, setEstadoModal ] = useState(false)
    const [ tituloModal, setTituloModal ] = useState('')
    const [ textoModal, setTextoModal ] = useState('')
    
    const handleClickLogin = async(e) => {
        e.preventDefault()
          
        const payload =  {
          "username": inputUsername,
          "password": inputPassword
        }
        try{

          const user = await axios.post(config.REACT_APP_API_URL + '/login',payload)
          if (user.status == 200){
            const payloadToken =  {
                "username": inputUsername,
            }

            const token = await axios.post(config.REACT_APP_API_URL + '/getToken',payloadToken)
            if(token.status == 200){

                const cookie = new Cookies();
                cookie.set('user','luis',{path: '/'})
                window.location.href='./menu'

            } else {
                setTituloModal("ERROR")
                setTextoModal("ERROR GENERAL")
                setEstadoModal(true)
            }

          } else {
            setTituloModal("ERROR")
            setTextoModal("USUARIO NO AUTORIZADO")
            setEstadoModal(true)
          }

        } catch (e){
          console.log(e)
        }

    }

    return <div className='container-login'>
        <section className='header-login'>header</section>
        <section className='container-form-login'>
            <form className='form-login' onSubmit={handleClickLogin}>
                <input onChange={e => setInputUsername(e.target.value)} className='login input-login' type="text" name="user" />
                <input onChange={e => setInputPassword(e.target.value)} className='login input-login' type="password" />
                <button type='submit' className='login btn-login'>Aceptar</button>
            </form>
        </section>
        <Modal
            estado={estadoModal}
            cambiarestado={setEstadoModal}
            titulo= {tituloModal}
            texto={textoModal}
        />
    </div>
}

export default Login