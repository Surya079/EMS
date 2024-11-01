import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentActionButtons = ({ _id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-2">
      <button
        className="px-3 py-1 bg-green-400"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}>
        Edit
      </button>
      <button className="px-3 py-1 bg-red-400">Delete</button>
    </div>
  );
};
