import React from "react";
import PageHeader from "../../components/page-header";

import TeacherItem from "../../components/teacher-item";
import Input from "../../components/input";
import Select from "../../components/select";

import "./styles.css";

function TeacherList() {
  return (
    <div id="page-teacher-list">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers">
          <Select
            name="subject"
            label="Matéria"
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
            name="subject"
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
          <Input type="time" name="time" label="Hora" />
        </form>
      </PageHeader>
      <main>
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
      </main>
    </div>
  );
}

export default TeacherList;
