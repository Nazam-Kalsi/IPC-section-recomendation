import React from "react";

function Select({ lable, options, oc ,raw}, ref) {
  return (
    <div>
      {lable && <lable className="block">{lable}</lable>}
      <select onChange={oc} ref={ref}>
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
