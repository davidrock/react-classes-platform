import React from "react";
import PageHeader from "../../components/page-header";

import Input from "../../components/input";
import warningIcon from "../../assets/images/icons/warning.svg";
import TextArea from "../../components/text-area";
import Select from "../../components/select";

import "./styles.css";

export default function TeacherForm() {
  return (
    <div id="page-teacher-form">
      <PageHeader
        title="Que incrível que você quer dar aulas!"
        description="O primeiro passo é preencher esse formulário de inscrição."
      />

      <main>
        <fieldset>
          <legend>Seus dados</legend>
          <Input name="name" label="Nome completo" />
          <Input name="avatar" label="Avatar" />
          <Input name="whatsapp" label="Whatsapp" />
          <TextArea name="bio" label="Biografia" />
        </fieldset>
        <fieldset>
          <legend>Sobre a aula</legend>
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
          <Input name="cost" label="Custo da sua hora por aula" />
        </fieldset>

        <fieldset>
          <legend>
            Horários disponíveis
            <button type="button">+ Novo horário</button>
          </legend>

          <div className="schedule-item">
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
            <Input name="from" label="Das" type="time" />
            <Input name="to" label="Até" type="time" />
          </div>
        </fieldset>

        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante" />
            Importante! <br />
            Preencha todos os dados
          </p>
          <button type="button"> Salvar</button>
        </footer>
      </main>
    </div>
  );
}
