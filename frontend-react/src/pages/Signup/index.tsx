import {Link} from "react-router-dom";
import {FormEvent, useRef, useState} from "react";
import axiosClient from "../../axios-client";
import {useStateContext} from "../../contexts/ContextProvider";
import {UserFormErrors} from "../../models/User";

export default function Signup() {

  const firstNameRef = useRef<HTMLInputElement>(null!);
  const lastNameRef = useRef<HTMLInputElement>(null!);
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const passwordConfirmationRef = useRef<HTMLInputElement>(null!);

  const [errors, setErrors] = useState<UserFormErrors | null>(null);
  const {setAuthUser, setToken} = useStateContext();

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();

    const payload = {
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }

    setErrors(null);

    axiosClient.post('/signup', payload)
      .then(({data}) => {
        setAuthUser(data.user);
        setToken(data.token);
      })
      .catch(error => {
        const response = error.response;

        if (response && response.status === 422) {
          setErrors(response.data.errors);
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
          {errors && errors.first_name && <div className="text-danger ps-3 mt-2">{errors.first_name[0]}</div>}
        </div>
        <div className="col-sm-6">
          <input ref={lastNameRef} type="text" className="form-control form-control-user" id="exampleLastName"
                 placeholder="Last Name"/>
          {errors && errors.last_name && <div className="text-danger ps-3 mt-2">{errors.last_name[0]}</div>}
        </div>
      </div>
      <div className="mb-3">
        <input ref={emailRef} type="email" className="form-control form-control-user" id="exampleInputEmail"
               placeholder="Email Address"/>
        {errors && errors.email && <div className="text-danger ps-3 mt-2">{errors.email[0]}</div>}
      </div>
      <div className="row mb-3">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <input ref={passwordRef} type="password" className="form-control form-control-user"
                 id="exampleInputPassword" placeholder="Password"/>
        </div>
        <div className="col-sm-6">
          <input ref={passwordConfirmationRef} type="password" className="form-control form-control-user"
                 id="exampleRepeatPassword" placeholder="Repeat Password"/>
        </div>
        <div className="col">
          {errors && errors.password && <div className="text-danger ps-3 mt-2">{errors.password[0]}</div>}
          {errors && errors.password_confirmation &&
            <div className="text-danger ps-3 mt-2">{errors.password_confirmation[0]}</div>}
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
      <div className="text-center mt-4">
        <Link to="/login">Already have an account? Login!</Link>
      </div>
      {/*<div className="text-center">
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>*/}
    </form>
  );
}
