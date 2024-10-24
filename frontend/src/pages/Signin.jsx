import { Heading } from "../component/Heading"
import { Subheading } from "../component/Subheading"
import { Inputbox } from "../component/Inputbox"
import { Button } from "../component/Button"
import { BottomText } from "../component/BottomText"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export function Signin(){

     const[username , setUsername] = useState("")
     const[password , setPassword] = useState("")
const navigate = useNavigate()
    return <div className="bg-slate-300 h-screen flex justify-center" >
         <div className="flex flex-col justify-center">
         <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
    <Heading label={"Signin"}/>
    <Subheading label={"Enter your credentials for Signin "}/>
    <Inputbox onChange={e=>{
     setUsername(e.target.value)
    }} label={"Email"} placeholder={"xyz@gmail.com"}/>
    <Inputbox onChange={e=>{
     setPassword(e.target.value)
    }} label={"Password"} placeholder={"12345"}/>
    <Button onClick={async ()=>{
     const response = await axios.post("http://localhost:3000/api/v1/user/signin" , {
          username : username,
          password:  password
     })
     localStorage.setItem("token" , response.data.token)
     navigate("/deshbord")

    }} label={"Signin"}/>
    <BottomText label={"New here? please"} buttonText={"Signup"} to={"/signup"}/>
    </div>
    </div>
    </div>
    }