//useeffect is used to code after the componentis rendered
import { useEffect,useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";


const Dashboard=()=>{
    //employees the list of employees ,initially it's an empty array
    const[employees,setEmployees]=useState([]);
    //departments holds department names with their ids as keys
    const[departments,setDepartments]=useState({});//set as an empty objects
    const[searchTerm,setSearchTerm]=useState("");
    const[currentPage,setCurrentPage]=useState(1);
    //setting the initial page number to 1
    const employeesPerPage=5;//show 5 employees per page.


    const navigate=useNavigate();

    useEffect(()=>{
        //fetch data is an async function to get employee and departmant data
        const fetchData=async()=>{
            try{
                //sends a request to get all employees and the result is stored in empRes
                const empRes=await axios.get("https://donnajoseph2025.pythonanywhere.com/api/employees/");
                const deptRes=await axios.get("https://donnajoseph2025.pythonanywhere.com/api/departments/");

                //converts departments array into an object for easy lookup
                const deptMap={};
                //deptMap is a js object to store key value pairs
                deptRes.data.forEach(dept => {
                    deptMap[dept.DepartmentId]=dept.DepartmentName

                });

                setEmployees(empRes.data);
                setDepartments(deptMap);
            }catch(error){
                alert("Error fetching data");
            }
   
        };
        fetchData();
    },[]);
    //Logout function
    const handleLogout=()=>{
        localStorage.removeItem("token");
        navigate("/");
    }
    //handle search input change
    const handleSearchChange=(e)=>{
        setSearchTerm(e.target.value.toLowerCase());
    };

    //filter employees based on search term
    const filteredEmployees=employees.filter((emp)=>{
        const deptName=departments[emp.DepartmentId]||"unknown";
        return(
        emp.EmployeeName.toLowerCase().includes(searchTerm)||
        emp.Designation.toLowerCase().includes(searchTerm)||
        deptName.toLowerCase().includes(searchTerm)
        );
    });
     //currentpage-the page number we are on right now
     //employeesperpage-How many employees we want to show on each page
     //this calcualte the last position of the employee to show on the current page
    const indexOfLastEmployee=currentPage*employeesPerPage;
    const indexOfFirstEmployee=indexOfLastEmployee-employeesPerPage;
    const currentEmployees=filteredEmployees.slice(indexOfFirstEmployee,indexOfLastEmployee);
    const totalpages=Math.ceil(filteredEmployees.length/employeesPerPage);

    return(
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-center m-0">Dashboard</h2>
                <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
            </div>
            {/* Add Employee button */}

            <div className="mb-3 text-end">
                <Link to="/add-employee" className="btn btn-success">
                Add Employee</Link>
            </div>
           
            {/* Search Input */}
            <div className="mb-3">
                <input type="text" placeholder="Search by name, designation or department"
                className="form-control"
                value={searchTerm}
                onChange={handleSearchChange}/>
            </div>

            {/* Employee list */}

            <div className="card p-3 mb-4">
                <h3>Employees</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEmployees.map((emp)=>(
                            <tr key={emp.EmployeeId}>
                                <td>{emp.EmployeeName}</td>
                                <td>{emp.Designation}</td>
                                <td>{departments[emp.DepartmentId]||"unknown"}</td>
                                <td>
                                {/*<button className="btn btn-primary btn-sm me-2">Edit</button> */}
                                <Link to={`/edit-employee/${emp.EmployeeId}`} className="btn btn-primary btn-sm me-2">Edit</Link>
                                {/*<button className="btn btn-dark btn-sm ">Delete</button>*/}
                                <Link to={`/delete-employee/${emp.EmployeeId}`} className="btn btn-danger btn-sm me-2">Delete</Link>
                                </td>


                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Buttons */}
                <div className="d-flex justify-content-center mt-3">
                    <button
                    className="btn btn-outline-primary me-2"
                    onClick={()=>setCurrentPage((prev)=>Math.max(prev-1,1))}
                    disabled={currentPage===1}
                    >
                        Previous
                    </button>
                    <span className="align-self-center">Page {currentPage} of {totalpages}</span>
                    <button className="btn btn-outline-primary ms-2"
                    onClickCapture={()=>setCurrentPage((prev)=>Math.min(prev+1,totalpages))}
                    disabled={currentPage===totalpages}
                    >Next</button>
                </div>
            </div>
             
            {/* Add Department button */}
            <div className="mb-3 text-end">
                <Link to="/add-department" className="btn btn-success">
                Add Department</Link>
            </div>

            <div className="card p-3">
                <h3>Departments</h3>
                <ul className="list-group">
                    {Object.values(departments).map((deptName,index)=>(
                        <li key={index} className="list-group-item">{deptName}</li>
                    ))}
                </ul>
            </div>
        </div>

    );

};
export default Dashboard;

// //useeffect is a special react hook that runs some code after the 
// //component has rendered like fetch data from an api
// //basic syntax

// useEffect(()=>{
//       //code
// },[]);

// //[] called the dependancy array

// //If it's empty the code runs once when the component loads.

// //If you put variables inside it like [count] the code runs every time count changes
//{DepartmentId:1,DepartmentName:"Maths"},
//]
//1:maths