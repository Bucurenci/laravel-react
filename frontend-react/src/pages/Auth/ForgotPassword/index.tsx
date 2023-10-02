import {Link} from "react-router-dom";
import {FormEvent} from "react";

export default function ForgotPassword() {

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
  }

  return (
    <form onSubmit={onSubmit} className="user">

      <div className="text-center">
        <h1 className="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
        <p className="mb-4">We get it, stuff happens. Just enter your email address below
          and we'll send you a link to reset your password!</p>
      </div>

      <div className="mb-3">
        <input type="email" className="form-control form-control-user"
               id="exampleInputEmail" aria-describedby="emailHelp"
               placeholder="Enter Email Address..."/>
      </div>
      <div className="d-grid">
        <Link to="login.html" className="btn btn-primary btn-user text-white">
          Reset Password
        </Link>
      </div>
      <hr/>
      <div className="text-center mt-4 mb-2">
        <Link to="/signup">Create an Account!</Link>
      </div>
      <div className="text-center">
        <Link to="/login">Already have an account? Login!</Link>
      </div>
    </form>
  );
}
