import React, { useState } from 'react';
import Search from "../components/Search/Search";
import User from "../components/User/User";
import { Error } from "../components/Error/Error";
import { UserProps } from "../Types/user";

const Home = () => {
    const [user, setUser] = useState<UserProps | null>(null);
    const [error, setError] = useState(false);

    const loadUser = async (userName: string) => {
        setError(false);
        setUser(null);

        const userRes = await fetch(`https://api.github.com/users/${userName}`);
        const userData = await userRes.json();

        if (userRes.status === 404) {
            setError(true);
            return;
        }

        const { avatar_url, login, location, followers, following } = userData;

        const userInfo: UserProps = {
            avatar_url,
            login,
            location,
            followers,
            following
        };

        setUser(userInfo);
    }

    return (
        <div>
            <Search loadUser={loadUser} />
            {user && <User {...user} />}
            {error && <Error />}
        </div>
    );
}

export default Home;
