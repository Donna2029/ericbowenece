import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";

const AddEmployee=()=>{
    const[employeeName,setEmployeeName]=useState("");
    const[designation,setDesignation]=useState("");
    const[contact,setContact]=useState("");
    const[departmentId,setDepartmentId]=useState("");
    const[departments,setDepartments]=useState([]);
    const[isActive,setIsActive]=useState("");
    const[dateOfJoining,setDateOfJoining]=useState("");

    const navigate=useNavigate();

    useEffect(()=>{
        const fetchDepartments=async()=>{
            try{
                const response=await axios.get("https://donna2029.pythonanywhere.com/api/departments/");
                setDepartments(response.data);

            }catch(error){
                alert("Error fetching departments");
            }
        };
        fetchDepartments();
    },[]);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const token=localStorage.getItem("token");
            await axios.post(
                "http://localhost:8000/api/employees/",
                {
                    EmployeeName:employeeName,
                    Designation:designation,
                    Contact:contact,
                    DepartmentId:departmentId,
                    IsActive:isActive,
                    DateOfJoining:dateOfJoining
                },
                {headers:{Authorization:`Token ${token}`}}
            );
            alert("Employee Added successfully");
            navigate("/dashboard");

        }catch(error){
            alert("error adding employee");
        }
    };

    return(
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow p-4">
                        <h2 className="text-center mb-4">Add Employee</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Employee Name</label>
                                <input
                                type="text" className="form-control" placeholder="Enter Employee name"
                                value={employeeName} onChange={(e)=>setEmployeeName(e.target.value)}
                                required/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Designation</label>
                                <input
                                type="text"
                                className="form-control"
                                placeholder="Enter designation" value={designation}
                                onChange={(e)=>setDesignation(e.target.value)}
                                required/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contact</label>
                                <input
                                type="text"
                                className="form-control"
                                value={contact}
                                onChange={(e)=>setContact(e.target.value)}
                                required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Department</label>
                                <select className="form-select" value={departmentId}
                                onChange={(e)=>setDepartmentId(e.target.value)}required>

                                <option value="">Select Department</option>
                                {departments.map((dept)=>(
                                    <option key={dept.DepartmentId} value={dept.DepartmentId}>
                                        {dept.DepartmentName}
                                    </option>
                                ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">DateOfJoining</label>
                                <input type="date" className="form-control" value={dateOfJoining}
                                onChange={(e)=>setDateOfJoining(e.target.value)}
                                required/>
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input"
                                checked={isActive}
                                onChange={(e)=>setIsActive(e.target.checked)}/>
                                <label className="form-check-label">Is Active</label>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">AddEmployee</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AddEmployee;