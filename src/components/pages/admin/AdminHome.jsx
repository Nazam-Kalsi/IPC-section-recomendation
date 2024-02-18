import React from "react";
import { Button } from "../../comp";
import { Link } from "react-router-dom";

function AdminHome() {
  return (
    <section className="flex justify-around h-[25rem]">

    <div className='flex flex-col justify-center items-center gap-8 border flex-grow-[0.5] bg-zz'>
        <Link to="/allComplaints">
        <Button className='py-2 px-4 text-xl'>View Complaints</Button>
      </Link>
        <Link to="/complaints">
        <Button className='py-2 px-4 text-xl'>Update Complaints</Button>
      </Link>
    </div>
    <div className="border flex-grow bg-[url(/home.svg)] bg-cover">
</div>
    </section>
  );
}

export default AdminHome;
