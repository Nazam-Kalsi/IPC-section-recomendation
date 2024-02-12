import React from "react";
function Input({
  label,
  type = "text",
  className = "",
  ...props
},ref) {
  return (
    <>
      <div className={`${className}`}>
        {label && <label htmlFor={label} className="block" >{label}</label>}
        <input id={label} type={type} {...props} ref={ref}/>
      </div>
    </>
  );
}

export default React.forwardRef(Input);
