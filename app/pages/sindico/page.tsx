"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firestore, auth } from "@/firebase/firebase";
import type { User } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import Navbar from "../../components/navbar";
import Carousel from "@/app/components/carousel";

export default function Admin() {
  const links = [
    { href: "./sindico/ocorrencia", text: "Registrar" },
    { href: "./sindico/anuncio", text: "Comunicado" },

    { href: "/visualizar", text: "Visualizar" },
  ];
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
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
    return () => unsubscribe();
  }, [router]);

  return (
    <>
      <Navbar links={links} />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Carousel />
      </div>
    </>
  );
}
