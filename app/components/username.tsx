"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firestore, auth } from "@/firebase/firebase";
import type { User } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import styles from "../../styles/navbar.module.css";

const UserName = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(`${userData.fullname} ${userData.role}`);
        }
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    //Clean up subscription on unmount
    return () => unsubscribe();
  }, [router]);

  return (
    <div>
      {userName && (
        <h1 className="text-4xl font-bold mb-6 ml-10">Bem Vindo, {userName}</h1>
      )}
    </div>
  );
};

export default UserName;
