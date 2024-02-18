import React from "react";
function Input({
  label,
  type = "text",
  className = "",
  ...props
},ref) {
  return (
    <>
      <div className={`${className} mt-5`}>
        {label && <label htmlFor={label} className="block font-semibold text-labelcol-200 mb-2" >{label}</label>}
        <input id={label} type={type} {...props} ref={ref} className='w-full border rounded-md p-2 outline-0 placeholder:text-placeholderblue focus:drop-shadow-[0_0_2px_rgba(20,48,73,1)] ' />
      </div>
    </>
  );
}

export default React.forwardRef(Input);
