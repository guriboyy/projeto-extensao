import { Container, Nav, Navbar } from "react-bootstrap";

export default function Header(){
    return(
        <Navbar bg="primary" expand="lg" fixed="top" data-bs-theme="dark">
        <Container>
          <Nav>
            <Navbar.Brand href="#home">Portal da Fraternidade</Navbar.Brand>
          </Nav>          
          <Nav className="me-auto">
            <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/Agenda">Agenda</Nav.Link>
            <Nav.Link href="/Eventos">Eventos</Nav.Link>
            <Nav.Link href="/Biblioteca">Biblioteca</Nav.Link>
            <Nav.Link href="/ManageUsers">Gerenciar Membros</Nav.Link>            
          </Nav>
          <Nav>
            <Nav.Link href="/login">Sair</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
}