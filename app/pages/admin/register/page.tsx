"use client";
import Link from "next/link";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";
import styles from "../../../../styles/signUp.module.css";
import { IoChevronBackCircleSharp } from "react-icons/io5";

const RegisterPage = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [building, setBuilding] = useState("");
  const [apartment, setApartment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);

      //Temporarily store user data in local storage
      localStorage.setItem(
        "registrationData",
        JSON.stringify({
          fullname,
          email,
          role,
          building,
          apartment,
        })
      );
      setMessage("Usuário Cadastrado com sucesso");

      setFullname("");
      setEmail("");
      setPassword("");
      setRole("");
      setBuilding("");
      setApartment("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Ocorreu um erro");
      }
    }
  };

  return (
    <div className={styles.background}>
      <h2 className="text-2xl font-mono text-blue-700 mb-10">
        Cadastrar Nova Pessoa
      </h2>
      <div className="p-5 border border-gray-300 rounded">
        <form onSubmit={handleRegister} className="space y-6 px-6 pb-4">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="fullname" className={styles.label}>
                Nome Completo
              </label>
              <input
                type="text"
                id="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
                className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-blue-700 border-gray placeholder-gray-400 text-white font-mono"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-blue-700 border-gray-500 placeholder-gray-400 text-white font-mono"
              />
            </div>
          </div>
          <div>
            <label htmlFor="role" className={styles.label}>
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-blue-700 border-gray-500 placeholder-gray-400 text-white font-mono"
            >
              <option value="">Selecionar</option>
              <option value="Sindico">Síndico</option>
              <option value="Morador">Morador</option>
              <option value="Porteiro">Porteiro</option>
              <option value="Admin">Administrador</option>
            </select>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="building" className={styles.label}>
                Nº de Prédio
              </label>
              <input
                type="number"
                id="bilding"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                required
                className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-blue-700 border-gray-500 placeholder-gray-400 text-white font-mono"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="apartment" className={styles.label}>
                Apartamento
              </label>
              <input
                type="number"
                id="apartment"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                required
                className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-blue-700 border-gray-500 placeholder-gray-400 text-white font-mono"
              />
            </div>
          </div>
          <div className="w-1/2">
            <label htmlFor="password" className={styles.label}>
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-blue-700 border-gray-500 placeholder-gray-400 text-white font-mono "
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm"> {message} </p>}
          <button type="submit" className={styles.button}>
            Enviar Dados
          </button>
          <Link className={styles.label} href="/pages/admin">
            <IoChevronBackCircleSharp />
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
