import FormsDefault from "../../components/forms/forms";
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  return(
  <>   
   <div className="d-flex vh-100 justify-content bg-custom">
      {/* Lado esquerdo com imagem */}
      <div className="w-50 d-flex justify-content-center align-items-center bg-bs-success">
        <img    className="img-fluid"
          style={{ maxWidth: "70%" }}
        src="/images/drawLogin.svg" alt="" />
      </div>     
      <div className="w-50 d-flex flex-column  justify-content-start align-items-center bg-white">        
          <img src="/images/2.png"
          className="img-fluid mt-2 mb-2"
          style={{ maxWidth: "30%" }} alt="" />
           <FormsDefault></FormsDefault>
        </div>
    </div>
    
  </>
  )
}

export default Login;