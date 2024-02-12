import React from 'react'
import { Button } from '../comp'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
        <Link to='/login'>
        <Button>Login</Button>
        </Link>
        <Link to='/signup'>
        <Button>Sign Up</Button>
        </Link>
    </div>
  )
}

export default Home