import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

function FormsDefault() {
    return(
        <Form className="p-5 shadow rounded" style={{ width: "80%", maxWidth: "400px" }}>
            <h3 className="text-center mb-4">Bem-vindo</h3>
              <Form.Group  className="mb-3" controlId="formBasicEmail">                
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                {/* <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text> */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
             
              <Button variant="primary" type="submit">
                Submit
              </Button>
          </Form>
    )
}

export default FormsDefault;