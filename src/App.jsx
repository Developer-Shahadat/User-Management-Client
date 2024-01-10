import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [user, setUser] = useState([])

  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUser(data))
  },[])
 
  const handleAddForm = e  => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email =  form.email.value;
    const formUser = {name,email};
    console.log(formUser);

    // POST IN Backend ..Data Backed a Jabe 
    fetch('http://localhost:5000/users',
    {
       method: 'POST',
       headers : {
        'content-type' : 'application/json'
       },
       body : JSON.stringify(formUser)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);

      const newUser = [...user , data]
      setUser(newUser);
      form.reset();
    })
  }

  return (
    <>
      
      
      <h1>User Management System</h1>
   
      <h3>Number Of User : {user.length}</h3>
      <form onSubmit={handleAddForm}>
          <input type="text" name="name" id="" placeholder='enter your name' />
          <br />
          <input type="email" name="email" id="" placeholder='enter your email' />
          <br />
          <input type="submit" value="ADD USER" />
      </form>
      
      <div>
      {
        user.map(users => <p key={users.id}> {users.id} : {users.name} : {users.email}</p>)
      }
      </div>
      
    </>
  )
}

export default App
