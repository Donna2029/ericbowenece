import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Signup from "./Authentication/Signup.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./Authentication/login.js";
import Dashboard from "./Dashboard/Dashboard";
import AddEmployee from "./Dashboard/AddEmployee.js";
import AddDepartment from "./Dashboard/AddDepartment.js";
import EditEmployee from "./Dashboard/EditEmployee.js";
import DeleteEmployee from "./Dashboard/DeleteEmployee.js";
function App(){
  return(
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/add-employee" element={<AddEmployee/>}/>
        <Route path="/add-department" element={<AddDepartment />} /> 
        <Route path="/edit-employee/:id" element={<EditEmployee/>}/>
        <Route path="/delete-employee/:id" element={<DeleteEmployee/>}/>

      </Routes>
    </Router>
  )
}
export default App;