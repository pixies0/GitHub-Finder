import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RepoProps } from '../Types/repo';
import Repos from '../components/Repo/Repo';
import { Error } from '../components/Error/Error';

const Repo = () => {
  const { username } = useParams<{ username: string }>();
  const [repos, setRepos] = useState<RepoProps[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      setError(false);
      const reposRes = await fetch(`https://api.github.com/users/${username}/repos`);
      if (reposRes.status === 404) {
        setError(true);
        return;
      }
      const reposData: RepoProps[] = await reposRes.json();
      setRepos(reposData);
    };

    fetchRepos();
  }, [username]);

  return (
    <div>
      {error ? <Error /> : <Repos repos={repos} />}
    </div>
  );
};

export default Repo;
