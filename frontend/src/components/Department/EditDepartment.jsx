import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });
  const [depLoading, setDeploading] = useState(false);

  useEffect(() => {
    const fetchDepartment = async () => {
      setDeploading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        
        
        if (response.data) {
          setDepartment({
            dep_name: response.data.department.dep_name , 
            description: response.data.department.description , 
          });
        } else {
          console.error("API did not return department data");
        }
      } catch (error) {
        console.error("Error fetching department:", error);
        alert("Could not load department data.");
      } finally {
        setDeploading(false);
      }
    };

    if (id) fetchDepartment();
  }, [id]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Edit Department
          </h2>
          <form>
            <div>
              <label
                htmlFor="dep_name"
                className="text-sm font-medium text-gray-700">
                Department Name
              </label>
              <input
                type="text"
                name="dep_name"
                placeholder="Enter Dep Name"
                value={department.dep_name}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Description"
                value={department.description}
                onChange={handleChange}
                className="mt-1 w-full block rounded-md p-2 border border-gray-300"
                rows="4"></textarea>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-HeavyDark_green text-white font-bold py-2 px-4 rounded">
              Edit Department
            </button>
          </form>
        </div>
      )}
    </>
  );
};