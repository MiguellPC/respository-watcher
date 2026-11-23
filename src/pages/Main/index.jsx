import { useCallback, useEffect, useState } from 'react';
import {
  Container,
  Form,
  SubmitButton,
  List,
  DeleteButton,
} from './styles';
import {
  FaGithub,
  FaPlus,
  FaSpinner,
  FaBars,
  FaTrash,
} from 'react-icons/fa';

import api from '../../sevices/api';
import { Link } from 'react-router';

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState(() => {
    if (typeof window === 'undefined') return [];

    const repoStorage = localStorage.getItem('repos');
    return repoStorage ? JSON.parse(repoStorage) : [];
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  //Salvar alterações
  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repositories));
  }, [repositories]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      async function submit() {
        setLoading(true);
        setAlert(false);

        try {
          if (newRepo.trim() === '') {
            throw new Error('Digite um nome de repositório!');
          }

          const hasRepo = repositories.find(
            (r) => r.name === newRepo,
          );

          if (hasRepo) {
            throw new Error('Repositório duplicado.');
          }

          const response = await api.get(`repos/${newRepo}`);

          const data = {
            name: response.data?.full_name,
          };

          setRepositories([...repositories, data]);
          setNewRepo('');
        } catch (err) {
          setAlert(true);
          console.log(err);
        } finally {
          setLoading(false);
        }
      }

      submit();
    },
    [newRepo, repositories],
  );

  const handleInputChange = (e) => {
    setNewRepo(e.target.value);
    setAlert(false);
  };

  const handleDelete = useCallback(
    (repoName) => {
      const find = repositories.filter((r) => r.name !== repoName);
      setRepositories(find);
    },
    [repositories],
  );

  return (
    <>
      <Container>
        <h1>
          <FaGithub size={25} />
          Meus Respositórios
        </h1>

        <Form onSubmit={handleSubmit} error={alert}>
          <input
            type="text"
            name=""
            id=""
            placeholder="Adicionar repositórios"
            value={newRepo}
            onChange={handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map((repo) => (
            <li key={repo.name}>
              <span>{repo.name}</span>
              <div>
                <Link
                  to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                  <FaBars size={20} />
                </Link>
                <DeleteButton onClick={() => handleDelete(repo.name)}>
                  <FaTrash size={14} />
                </DeleteButton>
              </div>
            </li>
          ))}
        </List>
      </Container>
    </>
  );
}
