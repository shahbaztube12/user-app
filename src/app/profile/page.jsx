"use client";
import { useRouter } from "next/navigation";
import axios from "axios";

const Profile = () => {
  const router = useRouter();

  const onLogout = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the logout API
      const response = await axios.post("/api/users/logout");

      if (response.status === 200) {
        // Redirect to the login page after successful logout
        router.push("/login");
      } else {
        console.error("Logout failed:", response.data.error);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white px-16 pt-8 pb-12 mb-4">
        <h1 className="text-3xl mb-4 text-center">Welcome to Home Page</h1>
        <p className="mb-4">
          Welcome to the profile page! <br />
          You can view your profile.
        </p>
        <button
          onClick={onLogout}
          className="px-2 py-2 text-white rounded-full w-full bg-red-500 p-2 hover:bg-blue-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
