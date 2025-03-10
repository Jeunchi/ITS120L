import { useNavigate } from 'react-router-dom'
import logo from '../assets/mapua_logo.svg'

function Home() {
const navigate=useNavigate();

    return (
      <div class="flex flex-row bg-gray-600">
        <div class="flex flex-col h-screen w-100">
          <div class="flex bg-red-600 text-center p-6">
            <h2 class="text-yellow-300 font-serif font-bold text-5xl">MAPUA LIBRARY</h2>
            <button type="submit" class="absolute inset-x-0 bottom-0 h-15 w-60 text-yellow-300 mb-12 mt-12 cursor-pointer rounded-tr-lg rounded-br-lg font-bold bg-red-600 px-6 h-9 w-35 hover:scale-105 delay-120 duration-250 ease-in-out">Sign Out</button>
          </div>
          <div class="flex flex-col gap-12 mt-12">
            <button type="submit" onClick={() => navigate('/Validator')} class="h-15 w-60 text-black cursor-pointer rounded-tr-lg rounded-br-lg font-bold bg-red-100 px-6 h-9 w-35 hover:scale-105 delay-120 duration-250 ease-in-out">Validator</button>
            <button type="submit" onClick={() => navigate('/Records')} class="h-15 w-60 text-black cursor-pointer rounded-tr-lg rounded-br-lg font-bold bg-red-100 px-6 h-9 w-35 hover:scale-105 delay-120 duration-250 ease-in-out">Records</button>
          </div>

        </div>
        <div class="flex flex-col h-screen bg-gray-950 place-content-center w-full">
                <div class="flex flex-col place-items-center text-center gap-7">
                    <img src={logo} class="flex h-screen" />
                </div>
        </div>
     </div>
    )
  }
  
  export default Home