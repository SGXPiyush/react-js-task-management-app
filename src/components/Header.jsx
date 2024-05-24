import React from 'react'

const Header = () => {
    return (
        <header className="header h-16 flex items-center px-4">
            <div className="search-box relative w-96 h-9 bg-white rounded-lg flex items-center justify-center">
                <i className="bx bx-search absolute left-2 top-1 text-2xl"></i>
                <input type="text" id="query" placeholder='Search For Task.' className='w-full h-full bg-transparent border-none outline-none rounded-lg text-base text-black pr-2 pl-10' />
            </div>
            <button className="create-a-task px-3 py-1 rounded-lg flex items-center justify-center ml-auto text-purple-500 border-2 border-purple-400 font-bold transition-all duration-500 hover:bg-purple-400 hover:text-white">
                <i className="bx bxs-plus-circle text-xl mr-1"></i>
                <span className="text">Create a Task</span>
            </button>
        </header>
    )
}

export default Header
