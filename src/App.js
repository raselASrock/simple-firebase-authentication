import './App.css';
import {getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import app from './firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app)

function App() {
  const [user, setUser] = useState({})
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const handleGoogleSignIn = () =>{
    console.log('google-comming-soon');
    signInWithPopup(auth, googleProvider)
    .then(result => {
      const user = result.user;
      setUser(user)
      console.log(user);
    })
    .catch( error => {
      console.error('error:', error);
    })
  }

  const handleSignOut = () =>{
    console.log('SignOuted');
    signOut(auth)
    .then( () => {
      setUser({})
    }) 
    .catch( () => {
      setUser({})
    })
  }

const handleGithubSignIn = () =>{
  signInWithPopup(auth, githubProvider)
  .then(result =>{
    const user = result.user;
    setUser(user)
    console.log(user);
  })
  .catch( error =>{
    console.error('error: ', error);
  })
}

  return (
    <div className="App">
      { user.uid ?
        <button onClick={handleSignOut}>Sign Out</button>
        :
      <>
        <button onClick={handleGoogleSignIn}>Google Sign In</button>
        <button onClick={handleGithubSignIn}>Github Sign in</button>
      </>
      }
      {user.uid && <div>
        <h3>User Name: {user.displayName}</h3>
        <p>User Email: {user.email}</p>
        <img src={user.photoURL} alt="" />
      </div>}
    </div>
  );
}

export default App;
