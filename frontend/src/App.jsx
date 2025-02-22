import {BrowserRouter , Routes , Route } from "react-router-dom"
 import { Desdhbord } from "./pages/Deshbord"
 import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { SendMoney } from "./pages/SendMoney"


 function App() {
  return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path="/signup" element ={<Signup/>}/>
    <Route path="/signin" element ={<Signin/>}/>
    <Route path="/deshbord" element ={<Desdhbord/>}/>
    <Route path="/send" element ={<SendMoney/>}/>
  </Routes>
  </BrowserRouter>
  </>
  )
}

export default App
