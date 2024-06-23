"use client";
import React, { useEffect, useState } from "react";
import styles from "../../styles/remove.module.css";
import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

async function fetchDataFromFirestore() {
  const querySnapshot = await getDocs(collection(db, "messages"));

  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

const Visualizar = () => {
  const [userMessage, setUserMessage] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const message = await fetchDataFromFirestore();
      setUserMessage(message);
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden md:max-w-2xl my-4">
      <h3 className={styles.h3}>Ocorrências no Condomínio</h3>
      <ul className="">
        {userMessage.map((message) => (
          <li className="p-8" key={message.id}>
            <span className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {message.fullname}
            </span>{" "}
            <p className="mt-2 text-gray-500">{message.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Visualizar;
