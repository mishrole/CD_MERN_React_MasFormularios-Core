import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const UserForm = ( props ) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  
  const [firstnameError, setFirstnameError] = useState('Firstname must be 2 characters or longer!');
  const [lastnameError, setLastnameError] = useState('Lastname must be 2 characters or longer!');
  const [emailError, setEmailError] = useState('Email must be 5 characters or longer!');
  const [passwordError, setPasswordError] = useState('Password must be 8 characters or longer!');
  const [confirmError, setConfirmError] = useState('Passwords must match');

  const [user, setUser] = useState(null);

  const createUser = (e) => {
    e.preventDefault();

    if (formIsValid(e)) {
      const newUser = { firstname, lastname, email, password, confirm };
      console.log('Welcome', newUser);
      setUser(newUser);
      Swal.fire({
        title: 'Success!',
        text: 'User created',
        icon: 'success',
        confirmButtonText: 'Cool'
      });
      clearForm();
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'All fields are required and must be valid',
        icon: 'error',
        confirmButtonText: 'I understand'
      });
    }
  }

  const formIsValid = (e) => {
    const isNotValid = [firstname, lastname, email, password, confirm]
    .some(element => element.length === 0);

    const errors = Array.from(e.target.children)
    .map(item => Array.from(item.children)
    .find(element => element.classList.contains('text-danger')))
    .filter(error => error != null);

    if (errors.length === 0 && !isNotValid) {
      return true;
    }

    return false;
  }

  const clearForm = () => {
    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');
    setConfirm('');

    setFirstnameError('Firstname must be 2 characters or longer!');
    setLastnameError('Lastname must be 2 characters or longer!');
    setEmailError('Email must be 5 characters or longer!');
    setPasswordError('Password must be 8 characters or longer!');
    setConfirmError('Passwords must match');
  }

  const handleFirstname = (e) => {
    setFirstname(e.target.value);

    if (e.target.value.length > 0) {
      if (e.target.value.length < 2) {
        setFirstnameError('Firstname must be 2 characters or longer!');
      } else {
        setFirstnameError('');
      }
    } else {
      setFirstnameError('');
    }
  }

  const handleLastname = (e) => {
    setLastname(e.target.value);

    if (e.target.value.length > 0) {
      if (e.target.value.length < 2) {
        setLastnameError('Lastname must be 2 characters or longer!');
      } else {
        setLastnameError('');
      }
    } else {
      setLastnameError('');
    }
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);

    if (e.target.value.length > 0) {
      if (e.target.value.length < 5) {
        setEmailError('Email must be 5 characters or longer!');
      } else {
        setEmailError('');
      }
    } else {
      setEmailError('');
    }
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);

    if (e.target.value.length > 0) {
      if (e.target.value.length < 8) {
        setPasswordError('Password must be 8 characters or longer!');
      } else {
        setPasswordError('');
      }
    } else {
      setPasswordError('');
    }

    if (e.target.value !== confirm) {
      setConfirmError('Passwords must match');
    } else {
      setConfirmError('');
    }
  }

  const handleConfirm = (e) => {
    setConfirm(e.target.value);

    if (e.target.value !== password) {
      setConfirmError('Passwords must match');
    } else {
      setConfirmError('');
    }

  }

  return (
    <Container className="p-3">
      <h3 className="text-center pb-2">New User</h3>
      <form onSubmit = { createUser }>
      <div className="mb-3">
        <label className="form-label fw-bold">Firstname (*)</label>
        <input className="form-control" type="text" onChange = { handleFirstname } value = { firstname } />
        {
          firstnameError ? <p className="text-danger">{ firstnameError }</p> : ''
        }
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Lastname (*)</label>
        <input className="form-control" type="text" onChange = { handleLastname } value = { lastname } />
        {
          lastnameError ? <p className="text-danger">{ lastnameError }</p> : ''
        }
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Email (*)</label>
        <input className="form-control" type="email" onChange = { handleEmail } value = { email } />
        {
          emailError ? <p className="text-danger">{ emailError }</p> : ''
        }
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Password (*)</label>
        <input className="form-control" type="password" onChange = { handlePassword } value = { password } />
        {
          passwordError ? <p className="text-danger">{ passwordError }</p> : ''
        }
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Confirm Password (*)</label>
        <input className="form-control" type="password" onChange = { handleConfirm } value = { confirm } />
        {
          confirmError ? <p className="text-danger">{ confirmError }</p> : ''
        }
      </div>

      <div className="d-flex justify-content-center">
        <Button type="submit">Create User</Button>
      </div>
    </form>

    {
      user ? 
      <div className="py-5">
        <div className="card">
          <div className="card-header">
            <h3 className="p-0 m-0">{user?.firstname} {user?.lastname}</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <p>Email: {user?.email}</p>
              <p>Password: {user?.password}</p>
            </div>
          </div>
        </div>
      </div> : ''
    }
    </Container>
  );
}

export default UserForm;