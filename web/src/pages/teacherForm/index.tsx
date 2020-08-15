import React, { useState, FormEvent } from "react";

import Select from "../../components/select";
import PageHeader from "../../components/page-header";
import Input from "../../components/input";
import TextArea from "../../components/text-area";
import warningIcon from "../../assets/images/icons/warning.svg";

import "./styles.css";
import api from "../../services/api";
import { useHistory } from "react-router-dom";

export default function TeacherForm() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setwhatsapp] = useState("");
  const [bio, setBio] = useState("");
  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");
  const history = useHistory();

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 1, from: "", to: "" },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {
        week_day: 0,
        from: "",
        to: "",
      },
    ]);
  }

  function handleCreateClass(evt: FormEvent) {
    evt.preventDefault();

    api
      .post("classes", {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      })
      .then(() => {
        alert("Cadastro realizado com sucesso");
        history.push("/");
      })
      .catch((e) => alert("Erro no cadastrro"));
  }

  function setScheduleItemValue(index: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((x, i) => {
      if (i === index) {
        return { ...x, [field]: value };
      }

      return x;
    });

    setScheduleItems(updatedScheduleItems);
  }

  return (
    <div id="page-teacher-form">
      <PageHeader
        title="Que incrível que você quer dar aulas!"
        description="O primeiro passo é preencher esse formulário de inscrição."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={(evt) => setName(evt.target.value)}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(evt) => setAvatar(evt.target.value)}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={(evt) => setwhatsapp(evt.target.value)}
            />
            <TextArea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(evt) => setBio(evt.target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={(evt) => setSubject(evt.target.value)}
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
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(evt) => setCost(evt.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((item, index) => {
              return (
                <div key={item.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da semana"
                    value={item.week_day}
                    onChange={(evt) =>
                      setScheduleItemValue(index, "week_day", evt.target.value)
                    }
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
                    name="from"
                    label="Das"
                    type="time"
                    value={item.from}
                    onChange={(evt) =>
                      setScheduleItemValue(index, "from", evt.target.value)
                    }
                  />

                  <Input
                    name="to"
                    label="Até"
                    type="time"
                    value={item.to}
                    onChange={(evt) =>
                      setScheduleItemValue(index, "to", evt.target.value)
                    }
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit"> Salvar</button>
          </footer>
        </form>
      </main>
    </div>
  );
}
