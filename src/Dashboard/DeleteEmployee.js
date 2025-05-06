import { useEffect,useState } from "react";
import { useParams,useNavigate} from "react-router-dom";
import axios from "axios";

const DeleteEmployee=()=>{
    const { id } = useParams();
    const navigate = useNavigate();
    const [employeeName, setEmployeeName] = useState("");

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`https://donnajoseph2025.pythonanywhere.com/api/employees/${id}/`);
                setEmployeeName(response.data.EmployeeName);
            }catch(error){
                alert("Error fetching employee details");
            }

        };
        fetchEmployee();
    },[id]);

    const handleDelete = async () => {
        try{
            const token = localStorage.getItem("token");
            await axios.delete(`https://donnajoseph2025.pythonanywhere.com/api/employees/${id}/`,{
                 Headers:{Authorization: `Token ${token}`},
        });
        alert("Employee deleted successfully");
        navigate("/dashboard");
     }catch(error){
        alert("Error deleting employee")
     }


  };
  return(
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card shadow p-4 text-center">
                    <h2 className="text-danger">Delete Employee</h2>
                    <p className="mt-3">Are you sure you want to delete<strong>{employeeName}</strong></p>
                    <div className="d-flex justify-content-center mt-4">
                        <button className="btn btn-danger me-3" onClick={handleDelete}>
                            Yes,Delete
                        </button>
                        <button className="btn btn-secondary" onClick={() => navigate("/dashboard")}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
export default DeleteEmployee;