import React from 'react';
import { useState,useEffect } from 'react';
import './Pagination.css';


export default function Paginaton(){

    const api = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

    const [employeesData, setEmployeeData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(10);

  

    useEffect(() => {
        const fetchdata = async() => {
            try{
                const res = await fetch(api);
                const data = await res.json();
                setEmployeeData(data);
                // console.log(data)

            }catch(error){
                console.error("Error fetching data: ", error);
                alert("failed to fetch data");

            }
        }

        fetchdata();
    }, []);
      
    
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = employeesData.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const handleNextPage = () => {
      
        if (currentPage < Math.ceil(employeesData.length / employeesPerPage)) {
        setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
       
        if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        }
    };

    return(
    
        <div className="table">
            <h1>Employee Data Table</h1>
            <table  width="100%" className="employee-table">
                <thead className="table-head">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                {currentEmployees.map((employee,index) => (
                    <tr key={employee.id} className={index === currentEmployees.length - 1 ? '' : 'employee-row'}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.role}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div style={{ marginTop: '20px' }}>
                <button className="btn" onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span className="btn" style={{ margin: '0 10px' }}>{currentPage}</span>
                <button
                    className="btn"
                    onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(employeesData.length / employeesPerPage)
                    
                >
                    Next
                </button>
            </div>
        </div>

    );
}

