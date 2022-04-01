import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../services/AuthService";

function Register() {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.register(user);
      history.push("/login");
    } catch (error) {
      const errors = [];
      Object.values(error.response.data.errors).map((error) =>
        errors.push(error)
      );
      alert(errors.map((error) => `${error} \n`));
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <br />
        <input
          type='email'
          placeholder='Email'
          name='email'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <br />
        <input
          type='password'
          placeholder='Password'
          name='password'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <br />
        <input
          type='password'
          placeholder='Confirm password'
          name='password_confirmation'
          value={user.password_confirmation}
          onChange={(e) =>
            setUser({ ...user, password_confirmation: e.target.value })
          }
        />
        <br />
        <button className='btn m-3'>Login</button>
      </form>
    </div>
  );
}

export default Register;
