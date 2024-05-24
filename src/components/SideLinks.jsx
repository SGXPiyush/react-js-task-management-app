import React from 'react';
import { NavLink } from 'react-router-dom';

const SideLinks = ({to, icon, text}) => {
    return (
        <NavLink to={to} className={(e) => e.isActive ? "sidebar-link-btn flex w-full items-center my-1 px-2 py-1 rounded-md text-white transition-all duration-500 bg-purple-400 active" : "sidebar-link-btn  flex w-full items-center my-1 px-2 py-1 rounded-md text-black transition-all duration-500 hover:bg-purple-400 hover:text-white "}>
            <i className={`${icon} mr-1 mb-1 text-lg`}></i>
            <p className="text">{text}</p>
        </NavLink>
    )
}

export default SideLinks
