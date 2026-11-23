import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
  width: clamp(300px, 80%, 600px);
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    padding-bottom: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
`;

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid ${(props) => (props.error ? '#ff0000' : '#eee')};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

const animate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs((props) => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #0d2636;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${animate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin: 20px auto;
  width: 70%;
  padding: 0 20px;

  li {
    padding: 15px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & + li {
      border-top: 1px solid #c6c6c6;
    }

    a {
      color: #0d2636;
      text-decoration: none;
    }
  }
`;

export const DeleteButton = styled.button.attrs({
  type: 'button',
})`
  background: none;
  border: none;
  color: red;
  text-align: center;
  margin: auto 5px;
`;
