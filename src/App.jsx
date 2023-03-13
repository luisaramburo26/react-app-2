import Login from './components/Login'
import Menu from './components/Menu'
import {ProtectedRout} from './components/ProtectedRout'
import {DataContextProvider} from './contexts/dataContext'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App(){



  return <>
  <DataContextProvider>
    <BrowserRouter>
      <Routes>
          <Route path='/menu' element={
            <ProtectedRout user=''>
              <Menu/>
            </ProtectedRout>}>
          </Route>
          <Route path='/' element={ <Login/> }></Route>
      </Routes>
    </BrowserRouter>
  </DataContextProvider>
  </>
}



export default App