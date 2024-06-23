"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "@/firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";
import styles from "../../styles/signUp.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user.emailVerified) {
        // Retrieve user data from local storage
        const registrationData = localStorage.getItem("registrationData");
        const {
          fullname = "",
          role = "",
          building = "",
          apartment = "",
        } = registrationData ? JSON.parse(registrationData) : {};

        // Check if user data exists in Firestore
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (!userDoc.exists()) {
          //Save user data to Firestore after email verification
          await setDoc(doc(firestore, "users", user.uid), {
            fullname,
            role,
            building,
            apartment,
            email: user.email,
          });
        }
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
            case "Porteiro":
              router.push("/pages/porteiro");
              break;
            case "Morador":
              router.push("/pages/morador");
              break;
          }
        }
      } else {
        setError("Verique seus dados antes de entrar");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Ocorreu algum erro");
      }
    }
  };

  return (
    <div className={styles.background}>
      <h2 className="text-4xl font-mono text-blue-700 mb-10">
        Insira seus Dados
      </h2>
      <div className="p-5 border border-gray-300 rounded">
        <form onSubmit={handleLogin} className="space y-6 px-6 pb-4">
          <div className="mb-15">
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-blue-700 border-gray placeholder-gray-400 text-white font-mono"
            />
          </div>
          <div className="mb-15">
            <label htmlFor="password" className={styles.label}>
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-blue-700 border-gray placeholder-gray-400 text-white font-mono"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className={styles.button}>
            Enviar Dados
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
