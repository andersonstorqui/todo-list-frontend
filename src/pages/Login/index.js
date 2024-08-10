import { useState } from "react";
import Button from '../../components/Button';
import InputComponents from '../../components/Input';
import { Container, Content, Label, LabelError, LabelSingUp, Strong } from "./style";
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


const Login = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleLogin = async () => {
  if (!email || !password) {
    setError('Preencha todos os campos!');
    return;
  }

  try {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('auth_token', data.token);
      navigate('/home');
    } else {
      setError(data.message || 'Erro ao fazer login');
    }
  } catch (error) {
    setError('Erro ao fazer login');
  }
};

  

  return (
    <>
      <Container>
        <Label>Login Todo-List</Label>
        <Content>
          <InputComponents
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            name="email"
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
          />
          <InputComponents
            type="password"
            placeholder="Digite sua senha"
            value={password}
            name="password"
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
          />
          <LabelError>{error}</LabelError>
          <Button Text="Entrar" onClick={handleLogin} />
          <LabelSingUp>
            Não tem uma conta?
            <Strong>
              <Link to='/signup'>&nbsp; Registre-se</Link>
            </Strong>
          </LabelSingUp>
        </Content>
      </Container>
    </>
  );
};

export default Login;
