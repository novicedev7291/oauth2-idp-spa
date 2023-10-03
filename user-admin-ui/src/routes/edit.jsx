import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { updateUser } from "../users";

export async function action({ request, params }) {
    let formData = await request.formData();
    let updates = Object.fromEntries(formData);
    await updateUser(params.userId, updates);
    return redirect(`/users/${params.userId}`);
}

export default function EditUser() {
    const { user } = useLoaderData();
    const navigate = useNavigate();
    return (
        <Form id="contact-form" method="post">
            <p>
                <span>Name</span>
                <input type="text" name="first" arial-label="firstname" placeholder="Firstname" defaultValue={user.first}/>
                <input type="text" name="last" arial-label="lastname" placeholder="Lastname" defaultValue={user.last}/>
            </p>
            <label >Avatar URL</label>
            <input type="text" name="avatar" arial-label="avatar" placeholder="https://example.com/avatar.jpg" defaultValue={user.avatar}/>
            <label >Email</label>
            <input type="email" name="email" arial-label="email" placeholder="abc@example.com" defaultValue={user.email}/>
            <label >Roles</label>
            <textarea name="roles" placeholder="Comma separated roles i.e. USER_NEW,USER_ADD,USER_EDIT,USER_DELETE" rows={6} defaultValue={user.roles}/>
            <p>
                <button type="submit">Save</button>
        <button type="button" onClick={() => {
            navigate(-1);
        }}>Cancel</button>
            </p>
        </Form>
    );
}
