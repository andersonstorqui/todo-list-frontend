import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { Container, Content, Label, Aside } from './style';
import ButtonLogout from '../ButtonLogout';

const Header = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem('auth_token');

    navigate('/login');
  };

  return (
    <Container>
      <Content>
        <Label>
          Minha lista de tarefas
        </Label>
        <Aside>
            <ButtonLogout Text="Sair" onClick={handleLogout} />
          </Aside>
      </Content>
    </Container>
  );
};

export default Header;
