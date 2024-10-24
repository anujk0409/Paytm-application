import { Appbar } from "../component/Appbar";
import { Balance } from "../component/Balance";
import { Users } from "../component/User";

export function Desdhbord(){
    return <div>
    <Appbar/>
    <Balance value={"10000"}/>
        <Users/>
    </div>
    }