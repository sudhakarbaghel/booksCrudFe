import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/table/Table";
import "./home.css";
import Popup from "../../components/popup/Popup";
const Home = () => {
  const [show, setShow] = useState("")
   const [employees, setEmployees] = useState([]);

   useEffect(() => {
     fetchEmployees();
   }, []);

   const fetchEmployees = async () => {
     try {
       const response = await axios.get(
         "https://employee-manager-backend-vrfr.vercel.app/api/employees"
       );
       setEmployees(response.data);
        
     } catch (error) {
       console.error("Failed to fetch employees", error);
     }
   };
  return (
    <div className="home">
      <button onClick={() => setShow("add")}>Add New Employee</button>
      {show === "add" && <Popup setShow={setShow} show={show} fetchEmployees={fetchEmployees} />}
      <Table setShow={setShow} show={show} fetchEmployees={fetchEmployees} data={employees} />
    </div>
  );
};

export default Home;
