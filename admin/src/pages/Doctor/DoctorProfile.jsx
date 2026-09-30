import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { imageUrl } from "../../utils/imageUrl";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  const updateProfile = async () => {
    try {
      const updateData = {
        fees: profileData.fees,
        address: profileData.address,
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dtoken: dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (!profileData) return null;

  return (
    <div className="m-5">
      <div className="flex flex-col gap-4 max-w-2xl">
        <img
          className="w-full sm:max-w-64 rounded-lg object-cover"
          src={imageUrl(profileData.image)}
          alt=""
        />

        <div className="bg-white border rounded p-6">
          <p className="text-2xl font-medium text-gray-700">
            {profileData.name}
          </p>
          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <p>
              {profileData.degree} - {profileData.speciality}
            </p>
            <span className="py-0.5 px-2 border text-xs rounded-full">
              {profileData.experience}
            </span>
          </div>

          <div>
            <p className="mt-3 text-sm font-medium text-gray-700">About:</p>
            <p className="text-sm text-gray-600 max-w-xl mt-1">
              {profileData.about}
            </p>
          </div>

          <p className="text-gray-700 mt-4">
            Appointment fee:{" "}
            <span className="text-gray-800 font-medium">
              {currency}
              {isEdit ? (
                <input
                  type="number"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      fees: e.target.value,
                    }))
                  }
                  value={profileData.fees}
                  className="border rounded px-2 py-1 w-24 ml-1"
                />
              ) : (
                profileData.fees
              )}
            </span>
          </p>

          <div className="flex gap-2 py-2 text-gray-600">
            <p>Address:</p>
            <p className="text-sm">
              {isEdit ? (
                <input
                  type="text"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={profileData.address.line1}
                  className="border rounded px-2 py-1 mb-1 w-full"
                />
              ) : (
                profileData.address.line1
              )}
              <br />
              {isEdit ? (
                <input
                  type="text"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={profileData.address.line2}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                profileData.address.line2
              )}
            </p>
          </div>

          <div className="flex items-center gap-1 pt-2">
            <input
              type="checkbox"
              checked={profileData.available}
              onChange={() =>
                isEdit &&
                setProfileData((prev) => ({
                  ...prev,
                  available: !prev.available,
                }))
              }
            />
            <label>Available</label>
          </div>

          {isEdit ? (
            <button
              onClick={updateProfile}
              className="mt-5 px-4 py-2 bg-primary text-white rounded-full text-sm"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="mt-5 px-4 py-2 border border-primary text-primary rounded-full text-sm"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;