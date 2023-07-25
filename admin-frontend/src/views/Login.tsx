import {Link} from "react-router-dom";

export default function Login() {

  const onSubmit = (ev) => {
    ev.preventDefault();
  }

  return (
    <form onSubmit={onSubmit} className="user">

      <div className="text-center">
        <h1 className="h4 text-gray-900 mb-4">Login into your account!</h1>
      </div>

      <div className="mb-3">
        <input type="email" className="form-control form-control-user"
               id="exampleInputEmail" aria-describedby="emailHelp"
               placeholder="Email Address..."/>
      </div>
      <div className="mb-3">
        <input type="password" className="form-control form-control-user"
               id="exampleInputPassword" placeholder="Password"/>
      </div>
      <div className="mb-3">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="rememberMe" />
          <label className="form-check-label" htmlFor="rememberMe">
            Remember Me
          </label>
        </div>
      </div>
      <div className="d-grid gap-2">
        <button className="btn btn-primary btn-user text-white">
          Login
        </button>
        {/*<hr/>
        <Link to="index.html" className="btn btn-google btn-user text-white">
          <i className="fab fa-google fa-fw"></i> Login with Google
        </Link>
        <Link to="index.html" className="btn btn-facebook btn-user text-white">
          <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
        </Link>*/}
      </div>
      <hr/>
      <div className="text-center mt-4 mb-2">
        <Link to="/signup">Create an Account!</Link>
      </div>
      <div className="text-center">
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
    </form>
  );
}
