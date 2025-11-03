import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import {useForm} from '../../hooks/useFormHooks'
import { Link } from 'react-router-dom';

function FormsDefault() {
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



export default FormsDefault;