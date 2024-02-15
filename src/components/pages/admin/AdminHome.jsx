import React from "react";
import { Button } from "../../comp";
import { Link } from "react-router-dom";

function AdminHome() {
  return (
    <div>
        <Link to="/allComplaints">
        <Button>View Complaints</Button>
      </Link>
        <Link to="/complaints">
        <Button>Update Complaints</Button>
      </Link>
    </div>
  );
}

export default AdminHome;
