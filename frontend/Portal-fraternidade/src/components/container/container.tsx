import { Container, Row, Col, Button, Table, Card } from "react-bootstrap";
import { useManageUsers } from "../../hooks/useManageUsersHook";
import { EventCard, MyNoticesCard, MyScheduleCard } from "../cards/event";
import { useEvent } from "../../hooks/useEventHook";

export function ContainerManageUsers() {
    const {manageUsers, handleNavigate} = useManageUsers();
    return (
       <Container className="mt-5 mx-auto px-4 d-flex justify-content-center">
        <div className="w-100" style={{ maxWidth: "900px" }}>
        <Card className="p-4 shadow-sm">
          <Card.Body>
            <Row className="align-items-center mb-3">
              <Col>
                <h4 className="fw-bold border-bottom pb-2">Gerenciar Membros</h4>
              </Col>
              <Col xs="auto">
                <Button variant="primary" href="/EditUsers" >Adicionar Novo Membro</Button>
              </Col>
            </Row>

            <Table bordered hover responsive>
              <thead className="table-light">
                <tr>
                  <th>Nome Completo</th>
                  <th>E-mail</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {
                  manageUsers?.data.map((u) => (
                       <tr>
                        <td>{u.firstName}</td>
                        <td>{u.email}</td>
                        <td>{u.isActive ? "Ativo" : "Inativo"}</td>
                        <td>
                          <Button variant="link" size="sm" onClick={() => handleNavigate(u.userAccountId)}>Editar</Button>
                        </td>
                      </tr>
                  ))
                }              
               
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export function ManageEvents() {
    const {eventsList} = useEvent()
    return (
       <Container className="mt-5 mx-auto px-4 d-flex justify-content-center">
        <div className="w-100" style={{ maxWidth: "900px" }}>
        <Card className="p-4 shadow-sm">
          <Card.Body>
            <Row className="align-items-center mb-3">
              <Col>
                <h4 className="fw-bold border-bottom pb-2">Mural de Eventos</h4>
              </Col>
              <Col xs="auto">
                <Button variant="primary" href="/CreateEvent" >Novo Evento</Button>
              </Col>
            </Row> 
            <Row>
              {
                eventsList?.data.map((t, index) => (
                  <EventCard category={t.title}
                  title={t.title}
                  date={t.eventDate}
                  description={t.description}></EventCard>
                ))
              }
            </Row>           
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export function ManageDashBoard() {
    return (
       <Container className="mt-5 mx-auto px-4 d-flex justify-content-center">
        <div className="w-100" style={{ maxWidth: "900px" }}>
        <Card className="p-4 shadow-sm">
          <Card.Body>
            <Row className="align-items-center mb-3">
              <Col>
                <h4 className="fw-bold border-bottom pb-2">Dashboard</h4>
              </Col>              
            </Row>
            <Row className="g-4">
              <Col md={6}>
                <MyScheduleCard/>
              </Col>
              <Col md={6}>
                <MyNoticesCard
                  notices={[
                    {
                      text: "A secretaria estará fechada nesta sexta-feira (25/10) para balanço.",
                      author: "Admin",
                      date: "23/10/2025"
                    },
                    {
                      text: "Início da campanha do agasalho. Deixe sua doação na recepção.",
                      author: "Admin",
                      date: "20/10/2025"
                    }
                  ]}
                />
              </Col>
            </Row>           
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}