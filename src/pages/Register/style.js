import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 100vh;
`

export const Content = styled.div`
  gap: 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 40%;
  box-shadow: 0 1px 2px #0003
  max-width: 350px;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
`

export const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
`

export const LabelSingUp = styled.label`
  font-size: 16px;
  color: #676767;
  text-align: center;
`

export const LabelError = styled.label`
  color: red;
  font-size: 14px;
  text-align: center;
`

export const Strong = styled.strong`
  cursor: pointer;

  a{
    text-decoration: none;
    color: #676767;
    text-align: center;
  }
`