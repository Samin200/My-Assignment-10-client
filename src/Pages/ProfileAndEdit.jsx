import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { FiEdit2, FiSave, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

const ProfileAndEdit = () => {
  const { user, UpdateProfile, DeleteAccount } = useContext(AuthContext);
  const [flipped, setFlipped] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () =>
        setFormData({ ...formData, photoURL: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    UpdateProfile(formData.name, formData.photoURL);
    setFlipped(false);
  };

  const DeleteUser = () => {
    Swal.fire({
  title: "Delete Account ?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
    DeleteAccount()
  }
});
    console.log("Delete user function called");
  };

  return (
    <div className="relative flex justify-center items-center h-screen max-sm:px-5 ">
      <div className={`relative w-full max-w-sm ${
        !flipped? 'h-[450px]' : 'h-[480px]'
        } perspective`}>
        <div
          className={`relative w-full h-full transition-transform duration-700 transform ${
            flipped ? "rotate-y-180" : ""
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front - Profile */}
          <div
            className="absolute w-full h-full flex flex-col items-center justify-center p-6 card bg-black border-red-500/60 border-2 shadow-red-500 shadow-2xl"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            <img
              src={
                formData.photoURL ||
                "https://static.vecteezy.com/system/resources/previews/024/983/914/large_2x/simple-user-default-icon-free-png.png"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full border-2 border-red-500 mb-4 object-cover"
            />
            <h2 className="text-white text-xl font-bold mb-1">
              {formData.name || "Your Name"}
            </h2>
            <p className="text-gray-400 mb-4">{formData.email}</p>
            <button
              className="btn btn-outline flex items-center"
              onClick={() => setFlipped(true)}
            >
              <FiEdit2 className="mr-2" /> Edit Profile
            </button>
          </div>

          {/* Back - Edit */}
          <div
            className="absolute w-full h-full rotate-y-180 flex flex-col items-center justify-center p-6 card bg-black border-red-500/60 border-2 shadow-red-500 shadow-2xl"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(-180deg)",
            }}
          >
            <form className="w-full" onSubmit={handleSave}>
              <div className="mb-4 relative">
                <img
                  src={
                    formData.photoURL ||
                    "https://static.vecteezy.com/system/resources/previews/024/983/914/large_2x/simple-user-default-icon-free-png.png"
                  }
                  alt="Profile"
                  className="w-28 h-28 rounded-full border-2 border-red-500 mb-2 object-cover"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="absolute bottom-0 right-0 w-28 opacity-0 cursor-pointer"
                />
              </div>

              <input
                type="text"
                defaultValue={formData.photoURL}
                placeholder="Profile Photo URL"
                onChange={(e) =>
                  setFormData({ ...formData, photoURL: e.target.value })
                }
                className="input mb-4 w-full"
              />
              <input
                type="text"
                defaultValue={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="input mb-4 w-full"
                placeholder="Name"
              />
              <input
                type="email"
                defaultValue={formData.email}
                disabled
                className="input mb-4 w-full"
                placeholder="Email"
              />

              <button className="btn btn-primary w-full flex items-center justify-center mb-2">
                <FiSave className="mr-2" /> Save
              </button>
              <button
                type="button"
                className="btn btn-outline w-full mb-2"
                onClick={DeleteUser}
              >
                <FiTrash2 className="mr-2" /> Delete Account
              </button>
              <button
                type="button"
                className="btn btn-outline w-full"
                onClick={() => setFlipped(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAndEdit;