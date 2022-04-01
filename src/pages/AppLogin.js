import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../services/AuthService";

function AppLogin({ onLogin }) {
  // history
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [invalidCred, setInvalidCred] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setInvalidCred(false);
    try {
      await AuthService.login(credentials);
      onLogin();
      history.push("/cars");
    } catch (error) {
      console.log(error);
      setInvalidCred(true);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Email'
          name='email'
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
        <br />
        <input
          type='password'
          placeholder='Password'
          name='password'
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <br />
        {invalidCred && <p>Invalid email or password</p>}
        <button className='btn m-3'>Login</button>
      </form>
    </div>
  );
}

export default AppLogin;
