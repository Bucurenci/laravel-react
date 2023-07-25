import {Link} from "react-router-dom";
import {useRef} from "react";
import axiosClient from "../axios-client";
import {useStateContext} from "../contexts/ContextProvider";

export default function Signup() {

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const {setUser, setToken} =  useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }

    axiosClient.post('/signup', payload)
      .then(({data}) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch(error => {
        const response = error.response;

        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      })
  }

  return (
    <form onSubmit={onSubmit} className="user">

      <div className="text-center">
        <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
      </div>

      <div className="row mb-3">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <input ref={firstNameRef} type="text" className="form-control form-control-user" id="exampleFirstName"
                 placeholder="First Name"/>
        </div>
        <div className="col-sm-6">
          <input ref={lastNameRef} type="text" className="form-control form-control-user" id="exampleLastName"
                 placeholder="Last Name"/>
        </div>
      </div>
      <div className="mb-3">
        <input ref={emailRef} type="email" className="form-control form-control-user" id="exampleInputEmail"
               placeholder="Email Address"/>
      </div>
      <div className="row mb-3">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <input ref={passwordRef} type="password" className="form-control form-control-user"
                 id="exampleInputPassword" placeholder="Password"/>
        </div>
        <div className="col-sm-6">
          <input ref={passwordConfirmationRef} type="password" className="form-control form-control-user"
                 id="exampleRepeatPassword" placeholder="Repeat Password" />
        </div>
      </div>
      <div className="d-grid gap-2">
        <button className="btn btn-primary btn-user text-white">
          Register Account
        </button>
      </div>
      {/*<hr>
        <a href="index.html" className="btn btn-google btn-user btn-block">
          <i className="fab fa-google fa-fw"></i> Register with Google
        </a>
        <a href="index.html" className="btn btn-facebook btn-user btn-block">
          <i className="fab fa-facebook-f fa-fw"></i> Register with Facebook
        </a>*/}
      <hr/>
      <div className="text-center mt-4 mb-2">
        <Link to="/login">Already have an account? Login!</Link>
      </div>
      <div className="text-center">
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
    </form>
  );
}
