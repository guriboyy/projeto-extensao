import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import {useForm} from '../../hooks/useFormHooks'
import { Link } from 'react-router-dom';
import { useManageUsersChildren } from '../../hooks/useManageUsersHook';
import { Col, Row } from 'react-bootstrap';
import { useEvent } from '../../hooks/useEventHook';
import { TemplateDate } from '../../utils/utils';
import { useActivityHook } from '../../hooks/useActivityHook';
import { handleNavigate } from '../../hooks/useUtilHook';

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
                name="phoneNumber"
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

export function FormsCreateEvent() {
  const {handleChange,event, handleSubmit, handleNavigate} = useEvent();
  const {formatForInputDatetimeLocal} = TemplateDate();
   return (
    <div className="container mt-4 p-4 border rounded shadow-sm bg-white">
      <h4 className="mb-4">Novo Evento</h4>

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Título do Evento</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={event.title}
                onChange={handleChange}                 
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Data</Form.Label>
              <Form.Control
                type="date"
                name="eventDate"
                value={event.eventDate}
                onChange={handleChange}                 
                required
              />
            </Form.Group>
          </Col>        
        </Row>
        <Row className='mb-3'>
           <Col md={6}>
            <Form.Group>
              <Form.Label>Descrição *</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={event.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Hora *</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={event.time}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          
          
        </Row>

        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" type='button' onClick={() => handleNavigate()}>Cancelar</Button>
          <Button type="submit" variant="primary">Criar Evento</Button>
        </div>
      </Form>
    </div>
  );
}

export function FormsCrateActivity() {
  const {usersList,handleChange,activity,id, handleSubmit, editActivity} = useActivityHook();
  const {goingAhead} = handleNavigate();
  return (
    <div className="container mt-5 p-4 border rounded shadow-sm bg-white">
      <h4 className="mb-4">Nova Atividade</h4>

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Título da Atividade</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={id? editActivity.titleMeeting : activity.title}
                onChange={(e) => handleChange(id,e)}                 
                required
              />
            </Form.Group>
          </Col>          
        </Row>
         <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Data</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={activity.date}
                onChange={(e) => handleChange(id,e)}                 
                required
              />
            </Form.Group>
          </Col>        

          <Col md={6}>
            <Form.Group>
              <Form.Label>Hora</Form.Label>
              <Form.Control
                type="time"
                name="hour"
                value={activity.hour}
                onChange={(e) => handleChange(id,e)}                 
                required
              />
            </Form.Group>
          </Col>        
        </Row>
        
        <Row className='mb-3'>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Dirigente</Form.Label>
              <Form.Select
                name="leader"                            
                onChange={(e) => handleChange(id,e)}  
                value={id ? editActivity.leader.userAccountId : 0}    
              >     
              <option value={0}>Selecione...</option>           
                {
                  usersList?.data.map((user:any, key:any) => (
                    <option value={user.userAccountId}>{user.firstName +" "+ user.lastName} </option>
                  ))
                }
                
              
              </Form.Select>
            </Form.Group>
          </Col>
         <Col md={6}>
            <Form.Group>
              <Form.Label>Evangelho</Form.Label>
              <Form.Select
                name="gospel"                 
                onChange={(e) => handleChange(id,e)}
                value={id ? editActivity.gospel.userAccountId : 0}
              >
                <option value={0}>Selecione...</option>
                {
                  usersList?.data.map((user:any, key:any) => (
                    <option value={user.userAccountId}>{user.firstName +" "+ user.lastName} </option>
                  ))
                }
              </Form.Select>
            </Form.Group>
          </Col> 
        </Row>
        <Row className='mb-3'>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Vibrações</Form.Label>
              <Form.Select
                 name="vibration"             
                onChange={(e) => handleChange(id,e)}
                value={id ? editActivity.vibration.userAccountId : 0}
              >
                <option value={0}>Selecione...</option>
                {
                  usersList?.data.map((user:any, key:any) => (
                    <option value={user.userAccountId}>{user.firstName +" "+ user.lastName} </option>
                  ))
                }
              </Form.Select>
            </Form.Group>
          </Col>
         <Col md={6}>
            <Form.Group>
              <Form.Label>Recepção / Fila</Form.Label>
              <Form.Select
                 name="frontDesk"                
                onChange={(e) => handleChange(id,e)} 
                value={id ? editActivity.frontDesk.userAccountId : 0}               
              >
                <option value={0}>Selecione...</option>
                {
                  usersList?.data.map((user:any, key:any) => (
                    <option value={user.userAccountId}>{user.firstName +" "+ user.lastName} </option>
                  ))
                }
              </Form.Select>
            </Form.Group>
          </Col> 
        </Row>
        <Row className='mb-3'>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Leitura</Form.Label>
              <Form.Select
                name="reading"                 
                onChange={(e) => handleChange(id,e)}      
                value={id ? editActivity.reading.userAccountId : 0}          
              >
                <option value={0}>Selecione...</option>
                {
                  usersList?.data.map((user:any, key:any) => (
                    <option value={user.userAccountId}>{user.firstName +" "+ user.lastName} </option>
                  ))
                }
              </Form.Select>
            </Form.Group>
          </Col>
         <Col md={6}>
            <Form.Group>
              <Form.Label>Dirigente Passe</Form.Label>
              <Form.Select
                name="passManager"              
                onChange={(e) => handleChange(id,e)} 
                value={id ? editActivity.passManager.userAccountId : 0}               
              >
                <option value={0}>Selecione...</option>
                {
                  usersList?.data.map((user:any, key:any) => (
                    <option value={user.userAccountId}>{user.firstName +" "+ user.lastName} </option>
                  ))
                }
              </Form.Select>
            </Form.Group>
          </Col> 
        </Row>
        <Row className='mb-3'>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Som / Imagem</Form.Label>
              <Form.Select
                 name="soundAndImage"               
                onChange={(e) => handleChange(id,e)}  
                value={id ? editActivity.soundAndImage.userAccountId : 0}              
              >
                <option value={0}>Selecione...</option>
                {
                  usersList?.data.map((user:any, key:any) => (
                    <option value={user.userAccountId}>{user.firstName +" "+ user.lastName} </option>
                  ))
                }
              </Form.Select>
            </Form.Group>
          </Col>
         <Col md={6}>
            <Form.Group>
              <Form.Label>Tema do Evangelho</Form.Label>
              <Form.Control
                as="textarea"             
                name="themeGospel"
                value={id ? editActivity.themeGospel : activity.themeGospel}
                onChange={(e) => handleChange(id,e)}
                placeholder="Digite aqui..."
              />
            </Form.Group>
          </Col> 
        </Row>

        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" type='button' onClick={() => goingAhead('Agenda')}>Cancelar</Button>
          <Button type="submit" variant="primary">Criar Evento</Button>
        </div>
      </Form>
    </div>
  )
}



