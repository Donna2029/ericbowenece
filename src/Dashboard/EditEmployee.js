import { useState,useEffect } from "react";
import{useParams,useNavigate} from "react-router-dom";
import axios from "axios";

const EditEmployee=()=>{
    const {id}=useParams();
    const navigate=useNavigate();

    const[employeeName,setEmployeeName]=useState("");
    const[designation,setDesignation]=useState("");
    const[contact,setConatct]=useState("");
    const[departmentId,setDepartmentId]=useState("");
    const[isActive,setIsActive]=useState(true);
    const[dateOfJoining,setDateOfJoining]=useState("");
    const[departments,setDepartments]=useState([]);

    useEffect(()=>{
        const fetchEmployee=async()=>{
            try{
                const empRes=await axios.get(`https://donna2029.pythonanywhere.com/api/employees/${id}/`);
                const depRes=await axios.get("https://donna2029.pythonanywhere.com/api/departments/");

                setEmployeeName(empRes.data.EmployeeName);
                setDesignation(empRes.data.Designation);
                setConatct(empRes.data.Contact);
                setDepartmentId(empRes.data.DepartmentId);
                setIsActive(empRes.data.IsActive);
                setDateOfJoining(empRes.data.DateOfJoining);
                setDepartments(depRes.data);

            }catch(error){
                alert("Error fetching employee details");
            }
        };
        fetchEmployee();

    },[id]);

    const handleUpdate=async(e)=>{
        e.preventDefault();
        try{
            const token=localStorage.getItem("token");
            await axios.put(
                `https://donna2029.pythonanywhere.com/api/employees/${id}/`,
                {
                    EmployeeName:employeeName,
                    Designation:designation,
                    Contact:contact,
                    DepartmentId:departmentId,
                    IsActive:isActive,
                    DateOfJoining:dateOfJoining
                },
                {
                    headers:{
                        Authorization:`Token${token}`,
                    },
                }
            );
            alert("Employee updated successfully");
            navigate("/dashboard");
        }catch(error){
            alert("Error updating employee ");
        }
    };
    return(
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                   <div className="card shadow p-4">
                      <h2 className="text-center mb-4">Edit Employee</h2>
                      <form onSubmit={handleUpdate}>
                        <div className="mb-3">
                            <label className="form-label">Employee Name</label>
                            <input type="text" className="form-control" placeholder="Enter Employee Name"
                            value={employeeName} 
                            onChange={(e)=>setEmployeeName(e.target.value)} 
                            required/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Designation</label>
                            <input type="text" className="form-control" placeholder="Enter Designation"
                            value={designation} 
                            onChange={(e)=>setDesignation(e.target.value)} 
                            required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contact</label>
                            <input type="text" className="form-control" placeholder="Enter Contact"
                            value={contact} 
                            onChange={(e)=>setConatct(e.target.value)} 
                            required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Department</label>
                            <select className="form-select" value={departmentId} 
                            onChange={(e)=>setDepartmentId(e.target.value)} 
                            required>
                                <option value="">Select Department</option>
                                {departments.map((dept)=>(
                                    <option key={dept.DepartmentId} value={dept.DepartmentId}>
                                        {dept.DepartmentName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Date Of Joining</label>
                            <input type="date" className="form-control" value={dateOfJoining}
                            onChange={(e)=>setDateOfJoining(e.target.value)}
                            required/>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" 
                            id="isactive" checked={isActive} 
                            onChange={(e)=>setIsActive(e.target.checked)}/>
                            <label className="form-check-label" htmlFor="isActive">Is Active</label>

                        </div>
                        <button type="submit" className="btn btn-success w-100">Update Employee</button>
                        <div className="text-center mt-3">
                            <button type="button" className="btn btn-secondary" 
                            onClick={()=>navigate("/dashboard")}>
                                Back to Dashboard
                            </button>
                        </div>
                      </form>
                   </div>
                </div>
            </div>
        </div>
    );
};

export default EditEmployee;