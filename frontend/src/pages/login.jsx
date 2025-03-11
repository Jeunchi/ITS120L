import { useNavigate } from 'react-router-dom'
import logo from '../assets/mapua_logo.svg'

function Login() {
const navigate=useNavigate();

    return (
      <div class="flex flex-col h-screen bg-gray-950 place-content-center">
        <div class="flex flex-col place-items-center text-center gap-7">
            <img src={logo} class="flex h-98 w-150" />
            <h2 class="text-red-600 font-serif font-bold text-6xl">MAPUA LIBRARY</h2>
        </div>
        <div class="flex place-content-center mt-5">
            <form class="flex flex-col gap-2">
                <label class="text-white text-2xl">Username</label>
                <input type="text" class="bg-gray-300 rounded-full w-80 h-9 px-3"></input>
                <label class="text-white text-2xl">Password</label>
                <input type="password" class="bg-gray-300 rounded-full w-80 h-9 px-3"></input>
                <div class="flex gap-3 mt-3 place-content-center">
                    <button type="button" onClick={() => navigate('/Signup')} class="text-black cursor-pointer font-bold rounded-full bg-yellow-300 px-4 h-9 w-35 hover:scale-105 delay-120 duration-250 ease-in-out">Sign Up</button>
                    <button type="submit" class="text-black cursor-pointer font-bold rounded-full bg-green-400 px-6 h-9 w-35 hover:scale-105 delay-120 duration-250 ease-in-out">Login</button>
                </div>

            </form>
        </div>

      </div>
    )
  }

  export default Login