import { Form, useLoaderData } from "react-router-dom"
import { getUser } from "../users"

export async function loader({ params }) {
    let user = await getUser(params.userId);
    return { user };
}

export default function User() {
    let { user } = useLoaderData();

    if (!user) {
        return (
            <div>User not found with id...</div>
        );
    }

    return <>
        <div id="contact">
            <div>
                <img key={user.avatar} src={user.avatar} />
            </div>
            <div>
                <h1>
                {user.first || user.last ? (
                    <>
                        {user.first} {user.last}
                    </>
                ) : (
                    <i>No Name</i>
                )}
                </h1>
                <h1>
                    {user.email}
                </h1>
                <h1>
                    {user.roles}
                </h1>
            <div>
                <Form action="edit">
                    <button type="submit">Edit</button>
                </Form>
                <Form action="destroy" method="post">
                    <button type="submit">Delete</button>
                </Form>
            </div>
            </div>
        </div>
        </>
}
