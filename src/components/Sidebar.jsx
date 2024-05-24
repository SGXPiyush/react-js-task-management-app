import React from 'react'
import SideLinks from './SideLinks'

const Sidebar = () => {
    return (
        <div className='sidebar-container w-64 h-full bg-white px-3 py-3 flex flex-col'>
            <h1 className="logo w-full text-xl font-bold flex items-center">Task <span className='px-1 py-0.5 bg-purple-400 ml-1 rounded-md text-white font-bold flex items-center'>Manager <i className='bx bxs-leaf ml-1'></i></span></h1>
            <ul className="links w-full mb-auto mt-12 ">
                <SideLinks to={"/"} icon={"bx bx-home"} text={"Home"} />
                <SideLinks to={"/coding"} icon={'bx bx-code-alt'} text={"Coding"} />
                <SideLinks to={"/study"} icon={'bx bxs-graduation'} text={"Study"} />
            </ul>
            <button className="logout-btn w-12 h-12 rounded-lg text-xl flex items-center justify-center text-black font-bold bg-gray-300 hover:bg-purple-500 hover:text-white transition-all duration-500">
                <i className="bx bx-log-out"></i>
            </button>
        </div>
    )
}

export default Sidebar
