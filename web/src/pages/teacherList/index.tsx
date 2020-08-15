import React, { useState, FormEvent } from "react";
import PageHeader from "../../components/page-header";

import TeacherItem, { Teacher } from "../../components/teacher-item";
import Input from "../../components/input";
import Select from "../../components/select";

import "./styles.css";
import api from "../../services/api";

function TeacherList() {
  const [subject, setSubject] = useState("");
  const [week_day, setWeek_day] = useState("");
  const [time, setTime] = useState("");
  const [teachers, setTeachers] = useState([]);

  async function searchTeachers(evt: FormEvent) {
    evt.preventDefault();

    const response = await api.get("classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setTeachers(response.data);

    console.log(response.data);
  }

  return (
    <div id="page-teacher-list">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={(evt) => {
              setSubject(evt.target.value);
            }}
            options={[
              { value: "Artes", label: "Artes" },
              { value: "Biologia", label: "Biologia" },
              { value: "Ciência", label: "Ciência" },
              { value: "Educação Física", label: "Educação Física" },
              { value: "Geografia", label: "Geografia" },
              { value: "História", label: "História" },
              { value: "Português", label: "Português" },
              { value: "Química", label: "Química" },
            ]}
          />
          <Select
            name="week_day"
            value={week_day}
            onChange={(evt) => {
              setWeek_day(evt.target.value);
            }}
            label="Dia da semana"
            options={[
              { value: "1", label: "Domingo" },
              { value: "2", label: "Segunda-Feira" },
              { value: "3", label: "Terça-Feira" },
              { value: "4", label: "Quarta-Feira" },
              { value: "5", label: "Quinta-Feira" },
              { value: "6", label: "Sexta-Feira" },
              { value: "7", label: "Sábado" },
            ]}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={(evt) => {
              setTime(evt.target.value);
            }}
          />

          <button type="submit"> Buscar</button>
        </form>
      </PageHeader>
      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
}

export default TeacherList;
