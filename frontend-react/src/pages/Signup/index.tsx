import {Link} from "react-router-dom";
import axiosClient from "../../axios-client";
import {useStateContext} from "../../contexts/ContextProvider";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {UserCreateSchema, UserCreateType} from "../../models/User";

export default function Signup() {
  const {setAuthUser, setToken} = useStateContext();

  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting}
  } = useForm<UserCreateType>({
    resolver: zodResolver(UserCreateSchema),
  });

  const onSubmit = (data: UserCreateType) => {

    axiosClient.post('/signup', data)
      .then(({data}) => {
        setAuthUser(data.user);
        setToken(data.token);
      })
      .catch(error => {
        let response = error.response;

        if (response && response.status === 422) {
          let errors = response.data.errors;

          if (errors.first_name) {
            setError("first_name", {type: "server", message: errors.first_name[0]})
          }
          if (errors.last_name) {
            setError("last_name", {type: "server", message: errors.last_name[0]})
          }
          if (errors.email) {
            setError("email", {type: "server", message: errors.email[0]})
          }
          if (errors.password) {
            setError("password", {type: "server", message: errors.password[0]})
          }
          if (errors.password_confirmation) {
            setError("password_confirmation", {type: "server", message: errors.password_confirmation[0]})
          }
        }
      })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="user">

      <div className="text-center">
        <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
      </div>

      <div className="row mb-3">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <input {...register("first_name")} type="text" className="form-control form-control-user"
                 placeholder="First Name"/>
          {errors.first_name &&
            <p className="text-danger ps-3 mt-2"> {errors.first_name.message}</p>}
        </div>
        <div className="col-sm-6">
          <input {...register("last_name")} type="text" className="form-control form-control-user"
                 placeholder="Last Name"/>
          {errors.last_name &&
            <p className="text-danger ps-3 mt-2"> {errors.last_name.message}</p>}
        </div>
      </div>
      <div className="mb-3">
        <input {...register("email")} type="email" className="form-control form-control-user"
               placeholder="Email Address"/>
        {errors.email && <p className="text-danger ps-3 mt-2"> {errors.email.message}</p>}
      </div>
      <div className="row mb-3">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <input {...register("password")} type="password" className="form-control form-control-user"
                 placeholder="Password"/>
        </div>
        <div className="col-sm-6">
          <input {...register("password_confirmation")} type="password" className="form-control form-control-user"
                 placeholder="Repeat Password"/>
        </div>
        <div className="col">
          {errors.password &&
            <p className="text-danger ps-3 mt-2"> {errors.password.message}</p>}
          {errors.password_confirmation &&
            <p className="text-danger ps-3 mt-2"> {errors.password_confirmation.message}</p>}
        </div>
      </div>
      <div className="d-grid gap-2">
        <button className="btn btn-primary btn-user text-white" disabled={isSubmitting}>
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
