import styled from "styled-components";

export const Container = styled.div`
  height: 75vh;
  margin: 0 50px;
  border-radius: 5px;
`
export const Content = styled.div`
  display: flex; 
   background-color: #C7AAFA;
  justify-content: start;
  align-items: center;
  padding: 50px;
`
export const Input = styled.input`
  outline: none;
  padding: 16px 20px;
  width: 90%;
  border-radius: 5px;
  font-size: 16px;

  background-color: #fff;
  border: none;
`

export const Button = styled.button`
  padding: 16px 20px;
  outline: none;
  cursor: pointer;
  width: 50%;
  border-radius: 5px;
  font-weight: 600;
  font-size: 16px;
  background-color: 046ee5;
  max-width: 350px;
`

export const Item = styled.li`
  outline: none;
  padding: 5px 10px;
  width: 60vw;
  border-radius: 5px;
  font-size: 16px;
  margin: 10px 0;
  background-color: #fff;
  border: none;
`