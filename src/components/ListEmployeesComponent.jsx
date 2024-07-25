import React, {useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../service/EmployeeService.js'
import { useNavigate } from 'react-router-dom';
const ListEmployeesComponent = () => {

  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();
  useEffect(() =>{
    getAllEmployees()
},[])
const getAllEmployees = () => {
    listEmployees().then((response)=>{
        setEmployees(response.data);})
        .catch(error=>{
            
            console.error(error.data.message);
        })
  }
  const addNewEmployee = () => {
    navigator('/add-employee')
  }
  const updateEmployee =(id) =>{
    navigator(`/edit-employee/${id}`);
  }

  const removeEmployee = (id) =>{
    console.log(id);
    
    deleteEmployee(id).then((response)=>{
        getAllEmployees();
    }).catch((error)=>console.error(error))
  }
  
    return (
    <div className='container'><h2 className='text-center'>List of Employees</h2>
    <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>

    <table className='table table-striped table-bordered'>
        <thead>
            <tr>
                <th scope='col'>Employee id:</th>
                <th scope='col'>Employee First Name:</th>
                <th scope='col'>Employee Last Name:</th>
                <th scope='col'>Employee Email Id</th>
                <th scope='col'>Actions</th>
            </tr>
        </thead>
        <tbody>
            {
                employees.map(employee =>
                <tr key={employee.id}>
                    <td scope='row'>{employee.id}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>
                        <button className='btn btn-info' onClick={()=>updateEmployee(employee.id)}>Update  </button>
                        <button className='btn btn-danger' onClick={()=>removeEmployee(employee.id)}>Delete</button>
                    </td>
                </tr>)
            }
        </tbody>
        </table></div>
  )
}

export default ListEmployeesComponent
