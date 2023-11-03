import './App.css'
import {Routes, Route} from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Home from './components/Home'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'

function App() {

  return (
    <div className=" h-[100vh]  flex justify-center items-center">
      <Routes>  
    <Route  path="/" element={<Home />}> </Route>
    <Route  path="/signup" element={<SignUp />}> </Route>
    <Route path="/signin" element={<SignIn />}>  </Route>
    <Route path="/forgotPassword" element={<ForgotPassword />} />
    <Route
          path="/resetPassword/:resetPasswordToken"
          element={<ResetPassword />}
        />

    </Routes>
    </div>
  )
}

export default App
