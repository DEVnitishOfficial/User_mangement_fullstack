import './App.css'
import {Routes, Route} from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Home from './components/Home'

function App() {

  return (
    <div className=" h-[100vh]  flex justify-center items-center">
      <Routes>  
    <Route  path="/" element={<Home />}> </Route>
    <Route  path="/signup" element={<SignUp />}> </Route>
    <Route path="/signin" element={<SignIn />}>  </Route>
    </Routes>
    </div>
  )
}

export default App
