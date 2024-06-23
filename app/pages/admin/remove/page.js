"use client";
import React, { useEffect, useState } from "react";
import styles from "../../../../styles/remove.module.css";
import { MdDelete } from "react-icons/md";
import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import removeUser from "@/app/components/removeUser";
import Link from "next/link";
import { IoChevronBackCircleSharp } from "react-icons/io5";

async function fetchDataFromFirestore() {
  const querySnapshot = await getDocs(collection(db, "users"));

  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

const Remove = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore();
      setUserData(data);
    }
    fetchData();
  }, []);
  const handleDelete = async (userId) => {
    if (userId) {
      await removeUser(userId);
    }
    const updatedUserData = userData.filter((user) => user.id !== userId);
    setUserData(updatedUserData);
  };
  // const handleDeleteSindico = (sindicoId) => {
  //   const updatedSindicos = sindicos.filter(
  //     (sindico) => sindico.id !== sindicoId
  //   );
  //   setSindicos(updatedSindicos);
  // };

  // const handleDeletePorteiro = (porteiroId) => {
  //   const updatedPorteiros = porteiros.filter(
  //     (porteiro) => porteiro.id !== porteiroId
  //   );
  //   setPorteiros(updatedPorteiros);
  // };
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden md:max-w-2xl my-4">
      <h3 className={styles.h3}>Usuários</h3>
      <ul>
        {userData.map((user) => (
          <li className={styles.li} key={user.id}>
            {user.fullname} - prédio {user.building} - apartamento{" "}
            {user.apartment}{" "}
            <MdDelete
              onClick={() => handleDelete(user.id)}
              className={styles.deleteIcon}
            />
          </li>
        ))}
        <Link className="" href="/pages/admin">
          <IoChevronBackCircleSharp />
        </Link>
      </ul>
    </div>
  );
};

export default Remove;
