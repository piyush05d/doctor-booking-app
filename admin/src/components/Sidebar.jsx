import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const linkClass =
    "flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer hover:bg-gray-100";

  return (
    <div className="min-h-screen bg-white border-r">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary text-primary" : ""}`
            }
            to="/admin-dashboard"
          >
            <span>📊</span>
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary text-primary" : ""}`
            }
            to="/all-appointments"
          >
            <span>📅</span>
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary text-primary" : ""}`
            }
            to="/add-doctor"
          >
            <span>➕</span>
            <p className="hidden md:block">Add Doctor</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary text-primary" : ""}`
            }
            to="/doctor-list"
          >
            <span>🩺</span>
            <p className="hidden md:block">Doctors List</p>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary text-primary" : ""}`
            }
            to="/doctor-dashboard"
          >
            <span>📊</span>
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary text-primary" : ""}`
            }
            to="/doctor-appointments"
          >
            <span>📅</span>
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary text-primary" : ""}`
            }
            to="/doctor-profile"
          >
            <span>👤</span>
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
