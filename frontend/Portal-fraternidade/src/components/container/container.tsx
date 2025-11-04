import { Container, Row, Col, Button, Table } from "react-bootstrap";
export function ContainerManageUsers() {
    return (
    <Container className="mt-4">
      <Row className="align-items-center mb-3">
        <Col>
          <h4 className="fw-bold border-bottom pb-2">Gerenciar Membros</h4>
        </Col>
        <Col xs="auto">
          <Button variant="primary">Adicionar Novo Membro</Button>
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
          <tr>
            <td>Antônio Carlos</td>
            <td>antonio@email.com</td>
            <td>Ativo</td>
            <td>
              <Button variant="link" size="sm">Editar</Button>
            </td>
          </tr>
          <tr>
            <td>Rose</td>
            <td>rose@email.com</td>
            <td>Ativo</td>
            <td>
              <Button variant="link" size="sm">Editar</Button>
            </td>
          </tr>
          <tr>
            <td>Kauê</td>
            <td>kaue@email.com</td>
            <td>Ativo</td>
            <td>
              <Button variant="link" size="sm">Editar</Button>
            </td>
          </tr>
          <tr>
            <td>Membro Afastado</td>
            <td>ex-membro@email.com</td>
            <td>Inativo</td>
            <td>
              <Button variant="link" size="sm">Editar</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}