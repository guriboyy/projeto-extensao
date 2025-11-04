import { ContainerManageUsers } from "../../components/container/container";
import Header from "../../components/header/header";
import "bootstrap/dist/css/bootstrap.min.css";
export function ManageUsers() {
    return(
        <>
            <Header></Header>
            <main>
                <ContainerManageUsers></ContainerManageUsers>
            </main>
        </>
    )
}