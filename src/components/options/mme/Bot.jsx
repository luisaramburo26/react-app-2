import {useState, useEffect, useRef} from 'react';
import Cookies from 'universal-cookie';
import axios from "axios";
import ModalIniciar from '../../modal/ModalIniciar';
import ModalDetener from '../../modal/ModalDetener';
import Modal from '../../modal/Modal';
import config from '/config'



function Bot(props) {

    const [selectedOptionPeriod, setSelectedOptionPeriod] = useState('15');
    const [ estadoMME, setEstadoMME] = useState('10');
    const [ estadoAP, setEstadoAP] = useState('10');
    const [ estadoTP, setEstadoTP] = useState('1');
    const [ estadoSimbol, setEstadoSimbol] = useState('');
    const [ estadoLog, setEstadoLog ] = useState('')
    const [ dataOperacion, setDataOperacion ] = useState(null)

    //modal
    const [ estadoModalIniciar, setEstadoModalIniciar ] = useState(false)
    const [ estadoModalDetener, setEstadoModalDetener ] = useState(false)
    const [ estadoModal, setEstadoModal ] = useState(false)
    const [ tituloModal, setTituloModal ] = useState('')
    const [ textoModal, setTextoModal ] = useState('')


    useEffect(() => {
        getLog()
    }, []);
  
    const myRef = useRef(null);
    const cookie = new Cookies();
    const user = cookie.get('user')


    const payloadToken =  {
        "username": user,
    }


    const getLog = async () =>{
        const token = await axios.post(config.REACT_APP_API_URL + '/getToken',payloadToken)
        if (token.status == 200){
            const headers = {
                headers: {
                    'Authorization': `Basic ${token.data}`
                }
            }
            const log = await axios.post(config.REACT_APP_API_URL + '/getLog',payloadToken,headers)
            setEstadoLog(log.data)
            myRef.current.scrollTop = myRef.current.scrollHeight;
        }
    }


    const handleSelectChangePeriod = (e) => {
        const period = e.target.value
        setSelectedOptionPeriod(period);
    };

    const handleChangeMME = (e) => {
        var MME = e.target.value.replace(/\D/g, '');
        if (MME.length > 2) {
            MME = MME.slice(0, 2);
        }
        setEstadoMME(MME)
    };

    const handleChangeAP = (e) => {
        var AP = e.target.value.replace(/\D/g, '');
        if (AP.length > 3) {
            AP = AP.slice(0, 3);
        }
        setEstadoAP(AP)
    };

    const handleChangeTP = (e) => {
        var TP = e.target.value.replace(/\D/g, '');
        if (TP.length > 3) {
            TP = TP.slice(0, 3);
        }
        setEstadoTP(TP)
    };

    const handleChangeSimbol = (e) => {
        var Simbol = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
        if (Simbol.length > 3) {
            Simbol = Simbol.slice(0, 20);
        }
        setEstadoSimbol(Simbol)
    };

    const handleClickIniciar =() => {

        const data = {
            "simbolo": estadoSimbol,
            "tp": estadoTP,
            "ap": estadoAP,
            "mme": estadoMME,
            "period": selectedOptionPeriod
        }


        if(data.simbolo !== '' && data.tp !== '' && data.ap !== '' && data.mme !== ''){
            setDataOperacion(data)
            setEstadoModalIniciar(true)
        } else {
            setTituloModal("ERROR")
            setTextoModal("EROR EN LOS PARAMETROS")
            setEstadoModal(true)
        }

    }


    return <div className='content-bot'>
            <div className='info-bot'>
                <div className='parametros-bot'>
                    <div>
                        <h1>SIMBOL:</h1>
                        <input type="text" value={estadoSimbol} onChange={handleChangeSimbol} style={{width:"150px"}} />
                    </div>
                    <div>
                        <h1>EXPONENTIAL MEAN:</h1>
                        <input type="text" value={estadoMME} onChange={handleChangeMME} style={{width:"30px"}} />
                    </div>
                    <div>
                        <h1>APALANCAMIENTO</h1>
                        <input type="text" value={estadoAP} onChange={handleChangeAP} style={{width:"30px"}}/>
                    </div>
                    <div>
                        <h1>TAKE PROFIT:</h1>
                        <input type="text" value={estadoTP} onChange={handleChangeTP} style={{width:"30px"}}/>
                    </div>
                    <div>
                        <h1>PERIOD:</h1>
                        <select value={selectedOptionPeriod} onChange={handleSelectChangePeriod}>
                            <option value="3">3 m</option>
                            <option value="5">5 m</option>
                            <option value="15">15 m</option>
                            <option value="30">30 m</option>
                        </select>

                    </div>
                </div>
                <div className='btn-bot'>
                    <button className='btn-bot-aceptar' onClick={ handleClickIniciar }>Iniciar</button>
                    <button className='btn-bot-cancelar' onClick={()=> setEstadoModalDetener(true) }>Detener</button>
                </div>
            </div>

            <section className='log-bot'>
                <section className='section-log'>
                    <p>Log:</p>
                    <button className='btn-actualizar-bot' onClick={ getLog }>Actualizar</button>
                </section>
                
                <div ref={myRef} className='txt-log'>
                    {estadoLog}
                </div>
            </section>
            <ModalIniciar
                estado={estadoModalIniciar}
                cambiarestado={setEstadoModalIniciar}
                actualizarLog = { getLog }
                re = {myRef}
                data = { dataOperacion }
            />
            <ModalDetener
                estado={estadoModalDetener}
                cambiarestado={setEstadoModalDetener}
                actualizarLog = { getLog }
                re = {myRef}
            />
            <Modal
                estado={estadoModal}
                cambiarestado={setEstadoModal}
                titulo= {tituloModal}
                texto={textoModal}
            />


        </div>
}

export default Bot