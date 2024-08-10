import { useState, useEffect, useTransition } from 'react';
import { Container, Content } from './style';
import ButtonMain from '../ButtonMain';
import InputMain from '../InputMain';

const Main = () => {
  const [tasks, setTasks] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:8080/tasks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setTaskList(data);
        } else {
          console.log('Erro ao buscar tarefas');
        }
      } catch (error) {
        console.log('Erro na requisição:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleSubmit = async () => {
    if (tasks.trim() === '') {
      console.log('A tarefa não pode estar vazia');
      return;
    }

    if (isEditing) {
      await handleEditTask();
    } else {
      await handleAddTask();
    }
  };

  const handleAddTask = async () => {
    try {
      const response = await fetch('http://localhost:8080/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ tasks })
      });

      if (response.ok) {
        const newTask = await response.json();
        startTransition(() => {
          setTaskList(prevTasks => [...prevTasks, newTask]);
          setTasks('');
        });
        console.log('Tarefa adicionada com sucesso!');
      } else {
        console.log('Erro ao adicionar tarefa');
      }
    } catch (error) {
      console.log('Erro na requisição:', error);
    }
  };

  const handleEditTask = async () => {
    try {
      const response = await fetch(`http://localhost:8080/tasks/${editTaskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ tasks })
      });

      if (response.ok) {
        const updatedTask = await response.json();
        startTransition(() => {
          setTaskList(prevTasks =>
            prevTasks.map(task =>
              task.idtasks === editTaskId ? updatedTask : task
            )
          );
          setTasks('');
          setEditTaskId(null);
          setIsEditing(false);
        });
        console.log('Tarefa editada com sucesso!');
      } else {
        console.log('Erro ao editar tarefa');
      }
    } catch (error) {
      console.log('Erro na requisição:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });

      if (response.ok) {
        startTransition(() => {
          setTaskList(prevTasks => prevTasks.filter(task => task.idtasks !== id));
        });
        console.log('Tarefa deletada com sucesso!');
      } else {
        console.log('Erro ao deletar tarefa');
      }
    } catch (error) {
      console.log('Erro na requisição:', error);
    }
  };

  const startEditTask = (task) => {
    setTasks(task.tasks);
    setEditTaskId(task.idtasks);
    setIsEditing(true);
  };

  return (
    <Container>
      <Content>
        <InputMain
          type="text"
          placeholder="Digite a tarefa"
          value={tasks}
          name="tasks"
          onChange={(e) => setTasks(e.target.value)}
        />
        <ButtonMain Text={isEditing ? "Salvar" : "Adicionar"} onClick={handleSubmit} />
      </Content>

      <Content>
        <ul>
          {taskList.map((task) => (
            <li key={task.idtasks}>
              {task.tasks}
              <button onClick={() => startEditTask(task)}>Editar</button>
              <button onClick={() => handleDeleteTask(task.idtasks)}>Deletar</button>
            </li>
          ))}
        </ul>
      </Content>
    </Container>
  );
}

export default Main;
