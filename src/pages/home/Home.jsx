import React, { useState } from 'react'
import Login from '../../components/Login/Login'
import Error from '../../components/Login/Error/Error'
import View from '../../components/UpdatePassword/Correo/View'

const Home = () => {
const [UpdatePassword, setUpdatePassword] = useState(true)

  return (
	<div>
     {
      UpdatePassword
      ? <Login setUpdatePassword={setUpdatePassword}/>
      :<View setUpdatePassword={setUpdatePassword}/>
     }
	</div>
  )
}

export default Home