import styles from "./Register.module.css";

import { useState, useEffect } from "react";

const Register = () => {
  return (
    <div>
      <h1> Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias.</p>
      <form className={styles.form}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Nome de usuário"
          />
        </label>
        <p></p>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail do usuário"
          />
        </label>
        <p></p>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira sua senha"
          />
        </label>
        <p></p>
        <label>
          <span>Confirmação de Senha:</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme a sua senha"
          />
        </label>
        <p></p>
        <button className="btn">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
