import React from 'react'
import { Button } from '../../comp'
import { Link } from 'react-router-dom'
function UserHome() {
  return (

<section className="flex h-[25rem]">
<div className='flex flex-col justify-center items-center gap-8 border flex-grow-[0.3] bg-zz'>
    <Link to="/complaint">
   <Button className='py-2 px-4 text-xl'>Add Complaint</Button>
    </Link>
    <Link to="/myComplaint">
   <Button className='py-2 px-4 text-xl'>View Complaints</Button>
    </Link>
</div>
<div className="border flex-grow bg-[url(/home.svg)] bg-cover">
  
</div>
</section>

    )
}

export default UserHome