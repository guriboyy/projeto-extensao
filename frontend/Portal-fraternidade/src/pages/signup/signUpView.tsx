import { ContainerManageUsers } from "../../components/container/container";
import Header from "../../components/header/header";
import "bootstrap/dist/css/bootstrap.min.css";
import { useManageUsers } from "../../hooks/useManageUsersHook";
export function ManageUsers() {
    useManageUsers();
    return(
        <>
            <Header></Header>
            <div>
                <ContainerManageUsers></ContainerManageUsers>
            </div>
            
            
        </>
    )
}