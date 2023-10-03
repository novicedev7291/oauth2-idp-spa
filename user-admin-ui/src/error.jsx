import { useRouteError } from "react-router-dom";

export default function Error() {
    const error = useRouteError();
    console.error(error);

    return <>
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, some unexpected error occurred</p>
            <p>
                <i>{error.statusText || error.data}</i>
            </p>
        </div>
        </>
}
