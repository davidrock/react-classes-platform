import React, { FormEvent } from "react";
import whtsIcon from "../../assets/images/icons/whatsapp.svg";
import "./styles.css";
import api from "../../services/api";

export interface Teacher {
  id: number;
  subject: string;
  cost: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  function createNewConnection(evt: FormEvent) {
    evt.preventDefault();

    api.post("connections", {
      user_id: teacher.id,
    });
  }

  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          alt="avatar"
        />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <footer>
        <p>Preço por hora</p>
        <strong>R${teacher.cost}</strong>
        <a
          // target="_blank"
          onClick={createNewConnection}
          href={`https://wa.me/${teacher.whatsapp}`}
          type="button"
        >
          <img src={whtsIcon} alt="whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
 