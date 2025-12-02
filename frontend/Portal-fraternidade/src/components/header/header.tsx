import { Container, Nav, Navbar } from "react-bootstrap";
import { handleNavigate } from "../../hooks/useUtilHook";

export default function Header(){
    const {goingAhead} = handleNavigate();
    return(
        <Navbar bg="primary" expand="lg" fixed="top" data-bs-theme="dark">
        <Container>
          <Nav>
            <Navbar.Brand href="#home">Portal da Fraternidade</Navbar.Brand>
          </Nav>          
          <Nav className="me-auto">
            <Nav.Link onClick={() => goingAhead('Dashboard')}>Dashboard</Nav.Link>
            <Nav.Link onClick={() => goingAhead('Agenda')}>Agenda</Nav.Link>
            <Nav.Link onClick={() => goingAhead('Events')}>Eventos</Nav.Link>
            <Nav.Link onClick={() => goingAhead('Biblioteca')}>Biblioteca</Nav.Link>
            <Nav.Link onClick={() => goingAhead('ManageUsers')}>Gerenciar Membros</Nav.Link>            
          </Nav>
          <Nav>
            <Nav.Link href="/login">Sair</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
}