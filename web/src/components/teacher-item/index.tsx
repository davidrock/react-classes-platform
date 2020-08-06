import React from "react";
import whtsIcon from "../../assets/images/icons/whatsapp.svg";
import "./styles.css";

export default function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          alt="avatar"
        />
        <div>
          <strong>Diogo Gravatar</strong>
          <span>Química</span>
        </div>
      </header>

      <p>
        Entusiasta das melhores tecnologias de química avançada.
        <br />
        <br />
        Apaixonado por explodir coisas em laboratório e por mudar a vida das
        pessoas através de experiências. Mais de 200.000 pessoas já passaram por
        uma das minhas explosões.
      </p>

      <footer>
        <p>Preço por hora</p>
        <strong>R$80,00</strong>
        <button type="button">
          <img src={whtsIcon} alt="whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
}
