import logo from '../assets/mapua_logo.svg'

function Validator() {


    return (
        <div class="flex flex-col h-screen bg-gray-950 place-content-center">
                <div class="flex flex-col place-items-center text-center relative h-screen">
                    <div class="flex z-10 flex-col mt-50">
                        <div class="flex flex-col bg-gray-700 z-10 p-6 rounded-[0.9vw] w-120">
                            <form class="flex flex-col gap-6 place-items-center">
                                <div class="flex bg-white h-60 w-60">
                                    placeholder
                                </div>
                                <div class="flex flex-col gap-3">
                                    <label class="text-white text-2xl self-start px-2">Student No.</label>
                                    <input type="text" class="pointer-events-none bg-gray-300 rounded-full w-80 h-9 px-3"></input>
                                    <label class="text-white text-2xl self-start px-2">Name</label>
                                    <input type="text" class="pointer-events-none bg-gray-300 rounded-full w-80 h-9 px-3"></input>
                                </div>
                                <div class="flex flex-row gap-3">
                                    <div class="flex flex-col">
                                        <label class="block text-white text-2xl self-start px-2">Course</label>
                                        <input type="text" class="pointer-events-none bg-gray-300 rounded-full w-40 h-9 px-3"></input>
                                    </div>
                                    <div class="flex flex-col">
                                        <label class="text-white text-2xl self-start px-2">Year</label>
                                        <input type="text" class="pointer-events-none bg-gray-300 rounded-full w-40 h-9 px-3"></input>
                                    </div>
                                </div>
        
                            </form>
                        </div>
                    </div>
                        <img src={logo} class="flex h-screen w-screen opacity-25 absolute z-0" />
                </div>
                
        
              </div>
    )
  }
  
  export default Validator