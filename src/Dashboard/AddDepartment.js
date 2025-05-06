import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
    const [departmentName, setDepartmentName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token"); 
            await axios.post(
                "https://donna2029.pythonanywhere.com/api/departments/",
                {
                    DepartmentName: departmentName
                },
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                }
            );
            alert("Department added successfully");
            navigate("/dashboard")
        } catch (error) {
            alert("Error adding department");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow p-4">
                        <h2 className="text-center mb-4">Add Department</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Department Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter department name"
                                    value={departmentName}
                                    onChange={(e) => setDepartmentName(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                Add Department
                            </button>
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

export default AddDepartment;