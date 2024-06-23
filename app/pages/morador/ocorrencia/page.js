"use client";
import React, { useEffect, useState } from "react";
import styles from "../../../../styles/signUp.module.css";
import { db } from "@/firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import Link from "next/link";
import { IoChevronBackCircleSharp } from "react-icons/io5";

async function addDataToFirestore(fullname, message) {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      fullname: fullname,
      message: message,
    });
    console.log("Document written wit ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document ", error);
    return false;
  }
}

function RegOcorrencias() {
  const [value, setValue] = useState({
    fullname: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const [data, setData] = useState();

  // useEffect(() => {
  //   if (Object.keys(errors).length === 0 && data) {
  //     SubmitButton(true);
  //   }
  // }, [SubmitButton, data, errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setData(true);

    if (data) {
      const added = await addDataToFirestore(value.fullname, value.message);
      if (added) {
        setValue({ fullname: "", message: "" });
        alert("Dados adicionados com sucesso");
      }
    }
  };

  const handleOnChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className={styles.background}></div>
      <form onSubmit={handleSubmit} autoComplete="off" className={styles.form}>
        <h3 className="text-4xl font-mono text-blue-700 mb-10">
          Registre a Ocorrência
        </h3>
        <label htmlFor="fullname" className={styles.label}>
          Nome
        </label>
        <input
          value={value.fullname}
          type="text"
          onChange={handleOnChange}
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-blue-700 border-gray placeholder-gray-400 text-white font-mono"
          name="fullname"
          required
        />
        {errors.fullname && <p className="p">{errors.fullname}</p>}
        <label htmlFor="message" className={styles.label}>
          Ocorrência
        </label>
        <textarea
          value={value.message}
          onChange={handleOnChange}
          type="text"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-blue-700 border-gray placeholder-gray-400 text-white font-mono"
          placeholder=" Relatar ocorrência"
          name="message"
          required
        />
        {errors.texto && <p className={styles.p}>{errors.texto}</p>}

        <button className={styles.button} onClick={handleSubmit}>
          Enviar
        </button>
        <Link href="/pages/morador" className="p-4">
          <IoChevronBackCircleSharp />
        </Link>
      </form>
    </>
  );
}

export default RegOcorrencias;
