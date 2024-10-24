import { Link } from "react-router-dom"

export function BottomText({label, to  , buttonText })
{
    return <div className="py-2 text-sm flex justify-center">
        <div className="text-slate-800 ">{label}</div>
        <Link className="text-cyan-600 pointer underline pl-1 cursor-pointer"  to={to}>{buttonText}</Link>
    </div>
}