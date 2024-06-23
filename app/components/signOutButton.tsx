"use client";

import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firestore, auth } from "@/firebase/firebase";

const SignOutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error em sair: ", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
    >
      Sair
    </button>
  );
};

export default SignOutButton;
