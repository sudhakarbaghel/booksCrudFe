import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/table/Table";
import "./home.css";
import Popup from "../../components/popup/Popup";

const Home = () => {
  const [show, setShow] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "https://books-crud-be.vercel.app/api/books"
      );
      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch employees", error);
      setLoading(false);
    }
  };

  const backendRepoLink = "https://github.com/sudhakarbaghel/booksCrudBE";  
  const frontendRepoLink = "https://github.com/sudhakarbaghel/booksCrudFE";  

  return (
    <div className="home">
      <h1
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontWeight: "700 !important",
          textAlign: "center",
        }}
      >
        Brew Books
      </h1>
      <div className="homeButton">
        <button onClick={() => setShow("add")}>Add New Book</button>
        {show === "add" && (
          <Popup
            setShow={setShow}
            show={show}
            fetchEmployees={fetchEmployees}
          />
        )}
        <div>
          <a
            href={backendRepoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            Backend Repo
          </a>

          <a
            href={frontendRepoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            Frontend Repo
          </a>
        </div>
      </div>

      <Table
        setShow={setShow}
        show={show}
        fetchEmployees={fetchEmployees}
        data={employees}
        loading={loading}
      />
    </div>
  );
};

export default Home;
