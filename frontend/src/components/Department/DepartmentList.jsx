import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { columns, DepartmentActionButtons } from "../../utils/DepartmentHelper";

export const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setdepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      setdepLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: <DepartmentActionButtons _id={dep._id} />,
          }));
          setDepartments(data);
          setFilteredDepartments(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setdepLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(searchTerm)
    );
    setFilteredDepartments(records);
  };

  return (
    <>
      {depLoading ? (
        <div> Loading....</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search by Dep Name"
              className="px-4 py-0.5"
              onChange={filterDepartments}
            />
            <Link
              to={"/admin-dashboard/add-department"}
              className="px-4 py-1 bg-HeavyDark_green rounded text-white">
              Add New Department
            </Link>
          </div>

          <div>
            <DataTable columns={columns} data={filteredDepartments} pagination />
          </div>
        </div>
      )}
    </>
  );
};

