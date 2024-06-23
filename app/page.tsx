"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "@/firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { User } from "firebase/auth";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.emailVerified) {
          const userDoc = await getDoc(doc(firestore, "users", user.uid));
          if (!userDoc.exists()) {
            // Retrieve user data from local storage
            const registrationData = localStorage.getItem("registrationData");
            const {
              fullname = "",
              role = "",
              building = "",
              apartment = "",
            } = registrationData ? JSON.parse(registrationData) : {};
            await setDoc(doc(firestore, "users", user.uid), {
              fullname,
              role,
              building,
              apartment,
              email: user.email,
            });

            // Clear registration data from local storage
            localStorage.removeItem("registrationData");
          }
          setUser(user);
          const userData = userDoc.data();
          if (userData) {
            const userRole = userData.role;

            switch (userRole) {
              case "Admin":
                router.push("/pages/admin");
                break;
              case "Sindico":
                router.push("/pages/sindico");
                break;
            }
          }
        } else {
          setUser(null);
          router.push("/login");
        }
      } else {
        setUser(null);
        router.push("/login");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {user ? "Redirecting to dashboard..." : "Redirecting to login..."}
    </div>
  );
};

export default HomePage;
