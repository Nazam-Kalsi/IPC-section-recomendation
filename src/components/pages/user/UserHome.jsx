import React from 'react'
import { Button } from '../../comp'
import { Link } from 'react-router-dom'
function UserHome() {
  return (
<>
<div>
    <Link to="/complaint">
   <Button>Add Complaint</Button>
    </Link>
    <Link to="/myComplaint">
   <Button>View Complaints</Button>
    </Link>
</div>
</>
    )
}

export default UserHome