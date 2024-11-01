import { Department } from "../models/Department.js";

const getDepartment = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "error while getting department in server",
    });
  }
};

const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    const newDepartment = new Department({
      dep_name: dep_name,
      description: description,
    });
    await newDepartment.save();
    return res.status(200).json({ succes: true, department: newDepartment });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Server error in department" });
  }
};

const EditDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Department.findById({ _id: id });
    
    return res.status(200).json({ succes: true, department });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Server error in department" });
  }
};

export { addDepartment, getDepartment, EditDepartment };
