import {Link} from "react-router-dom";

export default function Singup() {

    return (
      <div className="p-5">
        <div className="text-center">
          <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
        </div>
        <form className="user">
          <div className="row mb-3">
            <div className="col-sm-6 mb-3 mb-sm-0">
              <input type="text" className="form-control form-control-user" id="exampleFirstName"
                     placeholder="First Name"/>
            </div>
            <div className="col-sm-6">
              <input type="text" className="form-control form-control-user" id="exampleLastName"
                     placeholder="Last Name"/>
            </div>
          </div>
          <div className="mb-3">
            <input type="email" className="form-control form-control-user" id="exampleInputEmail"
                   placeholder="Email Address"/>
          </div>
          <div className="row mb-3">
            <div className="col-sm-6 mb-3 mb-sm-0">
              <input type="password" className="form-control form-control-user"
                     id="exampleInputPassword" placeholder="Password"/>
            </div>
            <div className="col-sm-6">
              <input type="password" className="form-control form-control-user"
                     id="exampleRepeatPassword" placeholder="Repeat Password" />
            </div>
          </div>
          <div className="d-grid gap-2">
            <Link to="login.html" className="btn btn-primary btn-user text-white">
              Register Account
            </Link>
          </div>
          {/*<hr>
            <a href="index.html" className="btn btn-google btn-user btn-block">
              <i className="fab fa-google fa-fw"></i> Register with Google
            </a>
            <a href="index.html" className="btn btn-facebook btn-user btn-block">
              <i className="fab fa-facebook-f fa-fw"></i> Register with Facebook
            </a>*/}
        </form>
        <hr/>
        <div className="text-center mt-4 mb-2">
          <Link to="/login">Already have an account? Login!</Link>
        </div>
        <div className="text-center">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    );
}
