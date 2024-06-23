"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firestore, auth } from "@/firebase/firebase";
import type { User } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

const ChangePasswordButton = () => {
  const router = useRouter();

  const handleChangePassword = () => {
    router.push("/changePassword");
  };

  return (
    <button
      onClick={handleChangePassword}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      {" "}
      Mudar Senha
    </button>
  );
};

export default ChangePasswordButton;
