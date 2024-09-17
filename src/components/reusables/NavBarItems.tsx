import React from 'react';
import { Image } from '../../assets';
import { useNavigate } from 'react-router-dom';

function NavBarItems() {
  const navigate = useNavigate();
  return (
    <div>
          <nav className=" bg-white-500 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center text-black text-2xl font-bold cursor-pointer" onClick={() => {localStorage.clear(); console.clear(); navigate("/")}}>
          <img src={Image?.circle} alt="circle-close" className="w-8 h-8 mr-2" title="Logout?"/>
          <span className="text-base ml-7">Account Activation</span>
            </div>
        </div>
      </div>
    </nav>
    <hr />
    </div>
  )
}

export default NavBarItems