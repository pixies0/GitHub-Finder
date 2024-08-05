import React from 'react';
import { RepoProps } from '../../Types/repo';

interface ReposProps {
    repos: RepoProps[];
}

const Repos: React.FC<ReposProps> = ({ repos }) => {
    return (
        <div>
            <h2>Repositórios</h2>
            <ul>
                {repos.map((repo, index) => (
                    <li key={index}>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            {repo.name}
                        </a>
                        <p>{repo.description}</p>
                        <p>Linguagem: {repo.language}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Repos;
