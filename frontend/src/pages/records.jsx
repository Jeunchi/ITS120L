import logo from '../assets/mapua_logo.svg'
import { useNavigate } from 'react-router-dom';


function Records() {
const navigate=useNavigate();

    return (
        <div className="flex flex-col bg-gray-950 place-content-center h-screen"> 
            <img src={logo} className="flex h-screen w-screen opacity-25 absolute z-0" />

        </div>
    )
  }
  
  export default Records