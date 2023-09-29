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

  .pie_chart {
    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 0.5rem;
    margin-top: 1rem;
  }
`;
