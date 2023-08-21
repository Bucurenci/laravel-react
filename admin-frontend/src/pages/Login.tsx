import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import {useStateContext} from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function Login() {

  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);

  const [errors, setErrors] = useState();
  const {setUser, setToken} =  useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    setErrors(null);

    axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data.user);
        setToken(data.token);

      })
      .catch(error => {
        const response = error.response;

        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          }
          else {
              setErrors({...errors, password: [response.data.message]});
          }
        }
      })
  }

  return (
    <form onSubmit={onSubmit} className="user">

      <div className="text-center">
        <h1 className="h4 text-gray-900 mb-4">Login into your account!</h1>
      </div>

      <div className="mb-3">
        <input ref={emailRef}
               type="email"
               className="form-control form-control-user"
               id="exampleInputEmail" aria-describedby="emailHelp"
               placeholder="Email Address..."
        />
        {errors && errors.email && <div className="text-danger ps-3 mt-2">{errors.email[0]}</div>}
      </div>
      <div className="mb-3">
        <input ref={passwordRef}
               type="password"
               className="form-control form-control-user"
               id="exampleInputPassword"
               placeholder="Password"
        />
        {errors && errors.password && <div className="text-danger ps-3 mt-2">{errors.password[0]}</div>}
      </div>
      {/*<div className="mb-3">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="rememberMe" />
          <label className="form-check-label" htmlFor="rememberMe">
            Remember Me
          </label>
        </div>
      </div>*/}
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
      <div className="text-center mt-4">
        <Link to="/signup">Create an Account!</Link>
      </div>
      {/*<div className="text-center">
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>*/}
    </form>
  );
}
