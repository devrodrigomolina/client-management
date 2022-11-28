import React, { useState, useEffect } from "react";
import Buttons from "../Buttons/Buttons";
import { Inputs } from "../Inputs/Inputs";
import { Title } from "../Title/Title";
import * as C from "./style";
import type { EventTypes } from "../../types/EventTypes";


type ModalType = {
  onClick: any;
  setModal: any;
};

const Modal = ({ onClick, setModal }: ModalType) => {
  const [name, setName] = useState<String>("");
  const [lastName, setLastName] = useState<String>("");
  const [userCpf, setUserCpf] = useState("");
  const [userCep, setUserCep] = useState("");
  const [userAdress, setUserAdress] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [userWhatsapp, setUserWhatsapp] = useState("");
  const [service, setService] = useState("");
  const [disableInput, setDisableInput] = useState(false)
  
  const handleAddClient = async () => {
    await fetch("http://localhost:8000/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        lastName,
        userCpf,
        userCep,
        userAdress,
        userWhatsapp,
        service,
      }),
    });
    setModal(false);
  };

  const fetchCep = async (cep: any) => {
    if(cep.length >= 8) {
      const dataCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const cepJson = await dataCep.json();
      setUserAdress(cepJson.logradouro);
      setDisableInput(true)
    }
  };

  useEffect(() => {
    fetchCep(userCep);
  }, [userCep]);

  return (
    <>
      <C.ContainerModal id="overlay" onClick={onClick}>
        <div className="modal">
          <Title message="Digite os dados do seu cliente" />
          <Inputs
            handleOnChange={({ target }: EventTypes) => setName(target.value)}
            value={name}
            type="text"
            placeholder="Digite o nome do cliente"
            name="Nome do cliente: *"
          />

          <Inputs
            handleOnChange={({ target }: EventTypes) =>
              setLastName(target.value)
            }
            value={lastName}
            type="text"
            placeholder="Digite o sobrenome do cliente"
            name="Sobrenome: *"
          />

          <Inputs
            handleOnChange={({ target }: EventTypes) =>
              setUserCpf(target.value)
            }
            value={userCpf}
            type="number"
            placeholder="Digite o CPF"
            name="CPF:"
          />

          <div className="adress-client">
            <Inputs
              id="cep"
              handleOnChange={({ target }: EventTypes) =>
                setUserCep(target.value)
              }
              value={userCep}
              type="text"
              placeholder="Digite o CEP"
              name="CEP do cliente:"
            />

            <Inputs
              id="adress"
              handleOnChange={({ target }: EventTypes) =>
                setUserAdress(target.value)
              }
              value={userAdress}
              type="text"
              disabled={disableInput}
              placeholder="Digite o endereço"
              name="Endereço do cliente:"
            />

            <Inputs
              id="number"
              handleOnChange={({ target }: EventTypes) =>
                setUserNumber(target.value)
              }
              value={userNumber}
              type="number"
              placeholder="Numero"
              name="Numero:"
            />

          </div>

          <Inputs
            handleOnChange={({ target }: EventTypes) =>
              setUserWhatsapp(target.value)
            }
            value={userWhatsapp}
            type="number"
            placeholder="Digite o Whatsapp"
            name="Whatsapp do cliente: *"
          />

          <div
            style={{ display: "flex", flexDirection: "column" }}
            className="services-area"
          >
            <label htmlFor="service">Digite os serviços prestados</label>
            <textarea
              onChange={({ target }) => setService(target.value)}
              value={service}
              style={{ resize: "none" }}
              name="service"
              id="service"
              cols={60}
              rows={10}
            ></textarea>
          </div>

          <Buttons
            onClick={handleAddClient}
            text="Enviar"
            color="#2ce706"
            color2="#1b8a05"
          />
        </div>
      </C.ContainerModal>
    </>
  );
};

export default Modal;
