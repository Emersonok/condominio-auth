"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";
import styles from "../../styles/signUp.module.css";

const PasswordChangePage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handlePasswordChange = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (newPassword !== confirmNewPassword) {
      setError("Nova Senha errada");
      return;
    }

    try {
      const user = auth.currentUser;
      if (user && user.email) {
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        setMessage("Senha mudada com sucesso");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        setError("Nenhum usuário encontrado");
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
      <h2 className="text-4xl font-mono text-blue-700 mb-10">Mudar Senha</h2>
      <div className="max-w-md w-full border border-gray-300 rounded">
        <form onSubmit={handlePasswordChange} className="space y-6 px-6 pb-4">
          <div>
            <label htmlFor="currentPassword" className={styles.label}>
              Senha Atual
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-blue-700 border-gray placeholder-gray-400 text-white font-mono"
            />
          </div>
          <div>
            <label htmlFor="newPassword" className={styles.label}>
              Nova Senha
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-blue-700 border-gray placeholder-gray-400 text-white font-mono"
            />
          </div>

          <div>
            <label htmlFor="confirmNewPassword" className={styles.label}>
              Confirmar Nova Senha
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
              className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-blue-700 border-gray placeholder-gray-400 text-white font-mono"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message} </p>}

          <button type="submit" className={styles.button}>
            Mudar Senha
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordChangePage;
