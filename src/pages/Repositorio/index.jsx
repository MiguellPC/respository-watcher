import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import {
  Container,
  Owner,
  Loading,
  BackButton,
  IssuesList,
  PageActions,
  FilterList,
} from './styles';
import api from '../../sevices/api';
import { FaArrowLeft } from 'react-icons/fa';

const filters = [
  { state: 'all', label: 'All', active: true },
  { state: 'open', label: 'Open', active: false },
  { state: 'closed', label: 'Closed', active: false },
];

export default function Repositorio() {
  const { id } = useParams();

  const [repositorio, setRepositorio] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [filterIndex, setFilterIndex] = useState(0);

  useEffect(() => {
    try {
      async function load() {
        const nomeRepo = id;

        const [repositorioData, issuesData] = await Promise.all([
          api.get(`/repos/${nomeRepo}`),
          api.get(`/repos/${nomeRepo}/issues`, {
            params: {
              state: filters.find((f) => f.active).state,
              per_page: 5,
            },
          }),
        ]);

        setRepositorio(repositorioData.data);
        setIssues(issuesData.data);
        setLoading(false);
      }

      load();
    } catch (err) {
      console.error('err :>> ', err);
    }
  }, [id]);

  useEffect(() => {
    async function loadIssues() {
      const nomeRepo = id;

      const response = await api.get(`/repos/${nomeRepo}/issues`, {
        params: {
          state: filters[filterIndex].state,
          page,
          per_page: 5,
        },
      });

      setIssues(response.data);
    }

    loadIssues();

    return () => {};
  }, [filterIndex, id, page]);

  function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1);
  }

  function handleFilter(index) {
    setFilterIndex(index);
  }

  if (loading) {
    return (
      <Loading>
        <h1>Loading...</h1>
      </Loading>
    );
  }

  return (
    <>
      <Container>
        <BackButton to="/">
          <FaArrowLeft color="#0e0e0e" size={20} />
        </BackButton>

        <Owner>
          <img
            src={repositorio.owner.avatar_url}
            alt="Repository owner's avatar"
          />
          <h1>{repositorio.name}</h1>
          <p>{repositorio.description}</p>
        </Owner>

        <FilterList active={filterIndex}>
          {filters.map((filter, index) => (
            <button
              key={filter.label}
              onClick={() => handleFilter(index)}>
              {filter.label}
            </button>
          ))}
        </FilterList>

        <IssuesList>
          {issues.map((issue) => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt="User avatar" />

              <div>
                <strong>
                  <a href={issue.html_url} target="_blank">
                    {issue.title}
                  </a>

                  <p>
                    {issue.labels.map((label) => (
                      <span key={String(label.id)}>{label.name}</span>
                    ))}
                  </p>
                </strong>

                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssuesList>

        <PageActions>
          <button
            type="button"
            onClick={() => handlePage('back')}
            disabled={page < 2}>
            Back
          </button>

          <button type="button" onClick={() => handlePage('next')}>
            Next
          </button>
        </PageActions>
      </Container>
    </>
  );
}
