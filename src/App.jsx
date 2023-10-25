import './App.css'
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'
import app from './firebase/firebase.config'
import { useState } from 'react';

function App() {
  const auth = getAuth(app);
  const providerGoogle = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  
  const handleSignIn = (provider) => {
    signInWithPopup(auth, provider)
    .then(result=>{
      setUser(result.user);
      console.log(result.user);
    })
    .catch(error => console.log("Error :", error.message))
  }

  const handleSignOUt = () => {
    signOut(auth);
    setUser(null);
  }

  return (
    <div style={{display: 'flex', gap: "21px", justifyContent: "center", alignItems: "center"}}>
      { user ?
        <div style={{textAlign: 'center'}}>
          <img src={user.photoURL} alt="" />
          <h2>Welcome, <span style={{color: 'green'}}>{user.displayName}</span></h2>
          {
            user.email && <h3>Email : <small>{user.email}</small></h3>
          }
          <button onClick={handleSignOUt} className="button logout">Sign Out</button>
        </div> :
        <>
          <button onClick={() => handleSignIn(providerGoogle)} className='button login'>Signin with Google</button>
        </>
      }
    </div>
  )
}

export default App
