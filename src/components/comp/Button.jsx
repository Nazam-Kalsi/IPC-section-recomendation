import React from "react";

function Button({ children, className = "", onClick,...props}) {
  return (
    <>
      <button onClick={onClick} className={`py-2 border rounded-md ${className} bg-labelcol hover:bg-placeholderblue-300 text-white`}>
        {children}
      </button>
    </>
  );
}

export default Button;
