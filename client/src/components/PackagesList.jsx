import { toast } from "react-toastify";
import PackageInfo from "../apis/PackageInfo";
import React, { useState, useEffect } from "react";
import UserInfo from "../apis/UserInfo";


const PackagesList = ({ user }) => {
    const [packages, setPackages] = useState([]);
    const [editingPackageId, setEditingPackageId] = useState(null);
    const [editedName, setEditedName] = useState(null);
    const [editedDescription, setEditedDescription] = useState(null);
    const [editedPrice, setEditedPrice] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    
    async function checkIfAdmin() { 
        const isAdmin = await UserInfo.isAdmin();
        setIsAdmin(isAdmin);
        // console.log("isAdmin", isAdmin);
      }
      
    checkIfAdmin()


    useEffect(() => {
        fetchPackages(isAdmin);
        // console.log("useEffect", isAdmin);
    }, []);
    
    const fetchPackages = async () => {
        try {
            const response = await PackageInfo.getPackages();
            setPackages(response.data);
        }
        catch(err) {
            toast.error("Error fetching packages");
            console.log(err);
        }
    };
    
    const handleSave = async (package_id, package_name, package_description, package_price) => {
        try {
            // console.log("kas cia", package_id, package_name, package_description, package_price)
            const response = await PackageInfo.updatePackage(isAdmin ,package_id, package_name, package_description, package_price);
            toast.success("Package updated successfully");
            setEditingPackageId(null);
            fetchPackages();
            window.location.reload();
        } catch (err) {
            toast.error("Error updating package");
            console.log(err);
        }
    };

    const handleDelete = async (package_id) => {
        try {
            const response = await PackageInfo.deletePackage(isAdmin, package_id);
            toast.success("Package deleted successfully");
            window.location.reload();
        } catch (err) {
            toast.error("Error deleting package");
            console.log(err);
        }
    };

    
    return (
        <div className="container text-light">
          <h1 className="text-center">Packages</h1>
          <ul className="list-group list-group-flush">
            {packages.map((pkg) => (
                <li key={pkg.package_id} className="list-group-item border rounded bg-transparent text-white d-flex justify-content-between align-items-center">
                    <div>
                        Package Name -{" "}
                        {editingPackageId === pkg.package_id ? (
                            <input
                                type="text"
                                defaultValue={pkg.package_name}
                                className="form-control"
                                onChange={(e) => setEditedName(e.target.value)}
                            />
                        ) : (
                            pkg.package_name
                        )}{";    "}
                        Package Description -{" "}
                        {editingPackageId === pkg.package_id ? (
                            <input
                                type="text"
                                defaultValue={pkg.package_description}
                                className="form-control"
                                onChange={(e) => setEditedDescription(e.target.value)}
                            />
                        ) : (
                            pkg.package_description
                        )}{";    "}
                        Package Price -{" "}
                        {editingPackageId === pkg.package_id ? (
                            <input
                                type="text"
                                defaultValue={pkg.package_price}
                                className="form-control"
                                onChange={(e) => setEditedPrice(e.target.value)}
                            />
                        ) : (
                            pkg.package_price
                        )}
                    </div>
                    {isAdmin && (
                    <div>
                        {editingPackageId === pkg.package_id ? (
                            <button
                                onClick={() => handleSave(pkg.package_id, editedName, editedDescription, editedPrice)}
                                className="btn btn-success"
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                onClick={() => setEditingPackageId(pkg.package_id)}
                                className="btn btn-warning"
                            >
                                Edit
                            </button>
                        )}
                        <button
                            onClick={() => handleDelete(pkg.package_id)}
                            className="btn btn-danger ml-2"
                        >
                            Delete
                        </button>
                    </div>
                    )}
                </li>
            ))}
            </ul>
        </div>

                        
            )
};

export default PackagesList;