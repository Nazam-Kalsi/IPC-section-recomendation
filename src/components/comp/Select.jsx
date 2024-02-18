import React from "react";

function Select({ lable, options, oc ,raw,className=''}, ref) {
  return (
    <div >
      {lable && <lable className="block font-semibold text-labelcol mb-2">{lable}</lable>}
      <select onChange={oc} ref={ref} className={`${className} p-2 rounded-md min-w-full`}>
        <option hidden>{raw}</option>
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
