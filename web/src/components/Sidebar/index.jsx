import './styles.css'
import React from 'react';

export const Sidebar = () => {
  return (
    <nav id="sidebar">
      <div className="sidebar-header">
        <h3>SGPMT</h3>
      </div>
        <br />
      <ul className="list-unstyled components">
        <li>
          <a href="procedimentos">Procedimentos</a>
        </li>
        <li>
          <a href="tarefas">Tarefas</a>
        </li>
        <li>
          <a href="solicitacoes">Solicitações</a>
        </li>
        <li>
          <a href="dashboard">Dashboard</a>
        </li>
        <div className='sair-btn'>
        <li>
          <a href="/">Sair</a>
        </li>
        </div>
      </ul>
      
    </nav>
  );
};

