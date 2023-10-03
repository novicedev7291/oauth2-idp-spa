import { Form, Link, Outlet, redirect, useLoaderData } from "react-router-dom";
import { allUsers, createUser } from "../users";
import { useOAuth } from "../useOAuth2";
import { TOKEN_KEY } from "../utils";
import { useEffect } from "react";

export async function loader() {
    let users = await allUsers();
    return { users };
}

export async function action() {
    let user = await createUser();
    return redirect(`/users/${user.id}`);
}

export default function Root() {
    const tokenKey = TOKEN_KEY;
    const { value, loading, error, getAuth  } = useOAuth({ 
        authorizeUrl: 'http://localhost:9000/oauth2/authorize',
        redirectUri: `${document.location.origin}/oauth2/callback`,
        clientId: 'public-web-client',
        scope: 'openid',
        tokenUrl: 'http://localhost:9000/oauth2/token',
        tokenKey
    });
    let { users } = useLoaderData();

    let loggedIn = Boolean(value?.access_token);

    useEffect(() => {
        async function fetchUsers() {
            users = await allUsers();
        }
        fetchUsers();
    }, [value, loading, error]);


    if (error) {
        return (
            <div>{`Error happened while authorizing user : ${error}`}</div>
        );
    }

    if (loading) {
        return (
            <div>Loading...</div>
        );
    }

    if (loggedIn) {
        return (
            <>
                <div id="sidebar">
                    <h1>Admin Users</h1>
                    <div>
                        <form id="search-form" role="search">
                        <input
                        id="q"
                        aria-label="Search users"
                        placeholder="Search"
                        type="search"
                        name="q"
                        />
                        <div
                        id="search-spinner"
                        aria-hidden
                        hidden={true}
                        />
                        <div
                        className="sr-only"
                        aria-live="polite"
                        ></div>
                        </form>
                        <Form method="post">
                        <button type="submit">New</button>
                        </Form>
                    </div>
                    <nav>
                    {users && users.length ? (
                        <ul>
                        {users.map(user => 
                            <li key={user.id}>
                            <Link to={`users/${user.id}`}>{user.first ? `${user.first} ${user.last}` : 'No Name'}</Link>
                            </li>
                        )}
                        </ul>
                    ):(<i>No users</i>)}
                    </nav>
                </div>
                <div id="detail">
                    <Outlet />
                </div>
            </>
        );
    }

    return (
        <div>
            <button type="button" onClick={() => getAuth()}>Login</button>
        </div>
    );
}
