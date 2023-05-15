import React from 'react'
import { Link, useNavigate } from "react-router-dom";


const Submit = () => {
    const navigate = useNavigate();

    const handleClick = () => {
    navigate("/histogram");
    };


  return (
    <div className="bg-[#9BA4B5] h-screen">
      <div className={`p-40 flex-col  flex justify-evenly items-center`}>
        <button
          onClick={handleClick}
          type="button"
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Submit Button
        </button>
        <p className="text-black font-semibold text-3xl ">
          Click on the 👆 button to Plot Histogram data from terriblytinytales
          api
        </p>
      </div>
    </div>
  );
}
export default Submit