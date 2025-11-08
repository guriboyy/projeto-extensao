import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import {useForm} from '../../hooks/useFormHooks'
import { Link } from 'react-router-dom';
import { useManageUsersChildren } from '../../hooks/useManageUsersHook';
import { Col, Row } from 'react-bootstrap';

export function FormsDefault() {
    const {setEmail, setPasswd,handleForm, error} = useForm();
    return(
     
        <Form onSubmit={(e)=> handleForm(e)} className="p-5 shadow rounded" style={{ width: "80%", maxWidth: "400px" }}>
            <h3 className="text-center mb-4">Bem vindo</h3>
              <Form.Group  className="mb-3" controlId="formBasicEmail">                
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                {/* <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text> */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={(e) => setPasswd(e.target.value)} type="password" placeholder="Password" />
                  <Form.Text id='information' className="text-muted mt-5 ">
                     <Link to={'/forgetPassword'}>Esqueci minha senha</Link>
                  </Form.Text>
               
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                 <Form.Text id='information' className="text-muted mt-5 ">
                    {error}
                  </Form.Text>               
              </Form.Group>
              
              <Button className='' variant="primary" type="submit">
                Submit
              </Button>
          </Form>
    )
}

export function FormsManageUser() {
  const {handleChange,editUsers, handleSubmit, handleNavigate} = useManageUsersChildren();
   return (
    <div className="container mt-4 p-4 border rounded shadow-sm bg-white">
      <h4 className="mb-4">Novo Membro (Usuário)</h4>

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Nome *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editUsers.name}
                onChange={handleChange}                 
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Sobrenome *</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={editUsers.lastName}
                onChange={handleChange}                 
                required
              />
            </Form.Group>
          </Col>        
        </Row>
        <Row className='mb-3'>
           <Col md={6}>
            <Form.Group>
              <Form.Label>E-mail *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editUsers.email ?? ""}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          
          <Col md={6}>
            <Form.Group>
              <Form.Label>Função *</Form.Label>
              <Form.Select
                name="role"
                value={editUsers.role}
                onChange={handleChange}
              >
                <option value="1">Administrador</option>
                <option value="2">Obreiro</option>
                <option value="3">Membro</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Telefone / WhatsApp</Form.Label>
              <Form.Control
                type="text"
                name="cel"
                value={editUsers.phoneNumber ?? ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Status *</Form.Label>
              <Form.Select
                name="status"
                value={editUsers.status ? "true": "false"}
                onChange={handleChange}
              >
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" type='button' onClick={() => handleNavigate()}>Cancelar</Button>
          <Button type="submit" variant="primary">Salvar Membro</Button>
        </div>
      </Form>
    </div>
  );
}



