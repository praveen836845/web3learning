import { useState } from "react";
import UpdateUserForm from "./UpdateUserForm";

const ProfilePage = () => {
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      {openEdit ? (
        <div className="mt-3 ">
          {" "}
          <UpdateUserForm setOpenEdit={setOpenEdit} />
        </div>
      ) : (
        <div className="bg-gray-100 min-h-screen flex flex-col">
          <div className="bg-white shadow-md p-6 w-full max-w-full">
            <header className="flex flex-col items-center mb-6">
              <h1 className="text-3xl text-gray-500 font-bold mb-4">
                Profile Page
              </h1>
              <div className="flex justify-between w-full px-6">
                {/* Additional profile info can be added here */}
              </div>
            </header>

            <div className="flex flex-row justify-between">
              <div className="flex flex-col items-start mb-7">
                {/* Profile Image */}
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <span className="text-gray-400 text-xl">IMG</span>
                </div>

                <p className="text-gray-600 text-lg mb-3">
                  <span className="font-semibold">Name:</span> John Doe
                </p>

                <div className="flex gap-2">
                  <a
                    className="text-blue-400 rounded-lg"
                    href="#"
                    target="_blank"
                  >
                    Instagram
                  </a>
                  <a
                    className="text-blue-400 rounded-lg"
                    href="#"
                    target="_blank"
                  >
                    Facebook
                  </a>
                  <a
                    className="text-blue-400 rounded-lg"
                    href="#"
                    target="_blank"
                  >
                    Website
                  </a>
                </div>
              </div>

              <div className="mr-10">
                <button
                  className="bg-blue-500 text-white p-2 rounded"
                  onClick={() => setOpenEdit(true)}
                >
                  Edit profile
                </button>
              </div>
            </div>

            <div className="px-6">
              <div className="mb-6">
                <p className="w-full p-4 rounded-lg mb-4">
                  <span className="font-semibold">Company/Product Name:</span>{" "}
                  Example Corp
                </p>
                <p className="w-full p-4 rounded-lg mb-4">
                  <span className="font-semibold">Referral Code:</span> ABC123
                </p>
                <p className="w-full p-4 rounded-lg">
                  <span className="font-semibold">Count of People:</span> 567
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
