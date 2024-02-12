import React from "react";

function Button({ children, className = "", ...props }) {
  return (
    <>
      <button className={`py-2 px-4 border hover:bg-blue-600 mx-4 rounded-md ${className}`}>
        {children}
      </button>
    </>
  );
}

export default Button;
