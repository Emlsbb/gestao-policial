import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 1rem;
  right: 2rem;

  width: 4rem;
  height: 4rem;

  border-radius: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background: gray;

  box-shadow: 0 0 1rem -0.25rem rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(0, 0, 0, 0.1);

  cursor: pointer;

  transition: 250ms ease;

  &:hover {
    transform: scale(1.05);
  }
`;
