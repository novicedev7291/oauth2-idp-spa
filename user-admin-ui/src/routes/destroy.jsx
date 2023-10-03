import { redirect } from "react-router-dom";
import { deleteUser } from "../users";

export async function action({ params }) {
    await deleteUser(params.userId);
    return redirect('/');
}
