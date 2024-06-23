"use client";
import React, { useEffect, useState } from "react";
import styles from "../../../../styles/signUp.module.css";

import { db } from "@/firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

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
    fullname: "ANÚNCIO",
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
      <div className={styles.background}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>
      <form onSubmit={handleSubmit} autoComplete="off" className={styles.form}>
        <h3 className={styles.h3}>Escreva seu nome e Descreva a ocorrência</h3>
        <label htmlFor="fullname" className={styles.label}>
          Nome
        </label>
        <input
          value={value.fullname}
          type="text"
          className={styles.input}
          name="fullname"
        />
        {errors.fullname && <p className="p">{errors.fullname}</p>}
        <label htmlFor="message" className={styles.label}>
          Ocorrência
        </label>
        <textarea
          value={value.message}
          onChange={handleOnChange}
          type="text"
          className={styles.textarea}
          placeholder=" Relatar ocorrência"
          name="message"
        />
        {errors.texto && <p className={styles.p}>{errors.texto}</p>}

        <button className={styles.button} onClick={handleSubmit}>
          Enviar
        </button>
        <a href="/pages/sindico">Voltar para tela inicial</a>
      </form>
    </>
  );
}

export default RegOcorrencias;
