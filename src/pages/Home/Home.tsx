import React from 'react'
import Cards from '../../components/Cards/Cards'
import ClientsPanel from '../../components/ClientsPanel/ClientsPanel'
import Header from '../../components/Header/Header'
import { Title } from '../../components/Title/Title'
import * as C from './style'

const Home = () => {
  const name = 'Rodrigo'

  return (
    <C.ContainerHome>
      <div className="header">
        <Header />
      </div>

      <C.ContainerPanel>
        <div className="titulo">
          <Title message={`Bem vindo ${name}`} />
          <h4 className='date'>23 nov 2022</h4>
        </div>

        <div className="container_cards">
          <Title message="Estatisticas" />
          <div className="cards">
            <Cards text="Clientes cadastrados" quantidade="30"/>
            <Cards text="Clientes maconheiros" quantidade="24"/>
            <Cards text="Clientes macumbeiros" quantidade="13"/>
          </div>
        </div>

        <div className="client_panel">
          <Title message='Clientes cadastrados' />
          <ClientsPanel />
        </div>
      </C.ContainerPanel>
      
    </C.ContainerHome>
  )
}

export default Home