import { NavLink, Outlet } from "react-router-dom";
import { AiOutlineForm } from "react-icons/ai"; // New icon for Vendor Management Create
import { FiPackage } from "react-icons/fi"; // New icon for Vendor Product
import { BsFolderX } from "react-icons/bs"; // New icon for Empty
import { useState } from "react";
import VendorManagementItem from "./VendorManagementItem";


const VendorManagement = () => {
  const [loading, setLoading] = useState(false);


  return (
    <div className="">
      <VendorManagementItem />
      <div></div>
    </div>
  );
};

export default VendorManagement;
