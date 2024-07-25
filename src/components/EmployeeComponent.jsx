import React, { useEffect, useState } from 'react'
import {createEmployee, getEmployee, updateEmployee} from '../service/EmployeeService'
import { useNavigate , useParams } from 'react-router-dom';
const EmployeeComponent = () => {
  const [firstName,setFirstName]= useState('');
  const [lastName,setLastName]= useState('');
  const [email,setEmail]=useState('');
  const  navigator = useNavigate();
  const [errors, setErrors] = useState({
    firstName:"",
    lastName:"",
    email:""
  })
  useEffect(()=>{
    id ? getEmployee(id).then((response)=>{
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEmail(response.data.email);
    }).catch((error)=>console.error(error)):""
  },[])
  const {id} = useParams(); 

  const validateForm = () =>{
    let valid = true;
    const errorCopy = {... errors};
    if(firstName.trim()){
      errorCopy.firstName = "";
    } else{
      errorCopy.firstName="First name is required"
      valid = false
    }
    if(lastName.trim()) {
      errorCopy.lastName = '';
    } else{
      errorCopy.lastName="Last name is required"

      valid =false;
    }

    if(email.trim()){
      errorCopy.email='';
    } else {
      errorCopy.email = 'Email is required'
      valid = false;

    }

    setErrors(errorCopy);

    return valid;
  }
  const saveEmployee = (e) =>{
    
   if(validateForm()){
      e.preventDefault();
      const employee = {firstName,lastName,email};
      createEmployee(employee).then((response)=>
        {console.log(response.data);})
      .catch((error)=>console.error(error))
      navigator('/employees');
  }
  }
  const updatingEmployee = (e) =>{
    if(validateForm()){ 
    e.preventDefault();
    const employee = {firstName,lastName,email};
    updateEmployee(id,employee).then((response)=>
      {console.log(response.data);})
    .catch((error)=>console.error(error))
    navigator('/employees')}
  }
  const pageTitle = () => id ? <h2 className='text-center'>Update Employee</h2> : <h2 className='text-center'>Add Employee</h2>;
  return (
    <div className="container">
      <div className='row'>
        <div className='card col-md-6 offset-md-3'>
          {pageTitle()}
          <div className='card-body'>
            <form>
              <div className='form-group'>
                <label className='form-label'> First Name:</label>
                <input 
                  type='text'
                  placeholder='Enter Employee First Name'
                  name='firstName'
                  value={firstName}
                  className={`form-control ${ errors.firstName ? 'is-invalid' : ''}`}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
              </div>
              <div className='form-group'>
                <label className='form-label'> Last Name:</label>
                <input 
                  type='text'
                  placeholder='Enter Employee Last Name'
                  name='lastName'
                  value={lastName}
                  className={`form-control ${ errors.lastName ? 'is-invalid' : ''}`}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}

              </div>
              <div className='form-group'>
                <label className='form-label'> Email:</label>
                <input 
                  type='text'
                  placeholder='Enter Employee Email'
                  name='email'
                  value={email}
                  className={`form-control ${ errors.email ? 'is-invalid' : ''}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}

              </div>
            </form>
            <button className='btn btn-success' onClick={id ? updatingEmployee : saveEmployee}>Submit</button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeComponent