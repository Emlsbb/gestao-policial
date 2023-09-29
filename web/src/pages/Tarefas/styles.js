import styled from "styled-components";

export const Container = styled.div`
  width: calc(100% - 500px);
  margin-top: 2rem;
  margin-left: 375px;
  margin-bottom: 2rem;

  border-radius: 0.5rem;

  padding: 2rem;

  background-color: #363636;

  position: relative;

  .title {
    color: white;

    font-size: 1.5rem;

    background: #929292;
    border-radius: 0.5rem;
    padding: 2rem;
  }

  table {
    margin-top: 2rem;

    width: 100%;
    border-collapse: separate;
    border-spacing: 0 15px;
    table-layout: fixed;

    color: white;

    margin-bottom: 4rem;

    th,
    td {
      border-bottom: 1px solid white;
      padding: 5px;
    }

    .no_schedule {
      color: white;
      margin-top: 2rem;
    }
  }
`;

export const EditButton = styled.button`
  background: none;
  outline: none;
  border: none;

  background: #907627;

  height: 3rem;
  border-radius: 0.5rem;

  color: white;
  margin-right: 1rem;
`;

export const DeleteButton = styled.button`
  background: none;
  outline: none;
  border: none;

  background: #9f1f14;

  height: 3rem;
  border-radius: 0.5rem;

  color: white;
`;
