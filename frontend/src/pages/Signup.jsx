import { BottomText } from "../component/BottomText";
import { Button } from "../component/Button";
import { Heading } from "../component/Heading";
import { Inputbox } from "../component/Inputbox";
import { Subheading } from "../component/Subheading";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup(){

const[firstName , setFirstName] = useState("")
const[lastName , setLastName] = useState("")
const[username , setUsername] = useState("")
const[password , setPassword] = useState("")
const navigate = useNavigate()


return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
    <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
<Heading label={"Signup"}/>
<Subheading label={"Enter your credentials for Signup "}/>
<Inputbox onChange={e=>{
    setFirstName(e.target.value)
}} label={"FirstName"} placeholder={"John"}/>
<Inputbox onChange={e=>{
    setLastName(e.target.value)
}} label={"LastName"} placeholder={"Doe"}/>
<Inputbox onChange={e=>{
    setUsername(e.target.value)
}} label={"Email"} placeholder={"xyz@gmail.com"}/>
<Inputbox onChange={e=>{
    setPassword(e.target.value)
}} label={"Password"} placeholder={"12345"}/>
<Button onClick={async ()=>{
   const response = await axios.post("http://localhost:3000/api/v1/user/signup" , {
        username:username,
        password:password,
        firstname:firstName,
        lastname:lastName,
    })
    localStorage.setItem("token" , response.data.token)
    navigate("/deshbord")
}} label={"Signup"}/>
<BottomText label={"Alredy have a account ?"} buttonText={"Signin"} to={"/signin"}/>
</div>
</div>
</div>
}