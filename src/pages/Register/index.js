import { Container, Label, Content, LabelError, LabelSingUp, Strong } from './style';
import { useState } from "react";
import Button from '../../components/Button';
import InputComponents from '../../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Register = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [config, setConfig] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signin } = useAuth();

  const handleSignUp = async () => {
    if (!email || !config || !password) {
      setError('Preencha todos os campos!');
      return;
    } else if (email !== config) {
      setError('Os e-mails não são iguais');
      return;
    }

    try {
      // Enviar dados para o backend na porta 8080
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Usuário cadastrado com sucesso!');
        navigate('/');
      } else {
        setError(result.message || 'Erro ao cadastrar usuário');
      }
    } catch (error) {
      setError('Erro ao conectar com o servidor');
    }
  };

  return (
    <>
      <Container>
        <Label>Registre-se no Todo-List</Label>
        <Content>
          <InputComponents
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            name="email"
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
          />
          <InputComponents
            type="email"
            placeholder="Confirme seu e-mail"
            value={config}
            onChange={(e) => { setConfig(e.target.value); setError(""); }}
          />
          <InputComponents
            type="password"
            placeholder="Digite sua senha"
            value={password}
            name="password"
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
          />
          <LabelError>{error}</LabelError>
          <Button Text="Inscrever-se" onClick={handleSignUp} />
          <LabelSingUp>
            Já tem uma conta?
            <Strong>
              <Link to='/'>&nbsp; Entre</Link>
            </Strong>
          </LabelSingUp>
        </Content>
      </Container>
    </>
  );
};

export default Register;
