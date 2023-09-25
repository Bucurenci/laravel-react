import {Link} from "react-router-dom";
import {useStateContext} from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {UserLoginSchema, UserLoginType} from "../../validations/UserLogin";

export default function Login() {
  const {setAuthUser, setToken} = useStateContext();

  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting}
  } = useForm<UserLoginType>({
    resolver: zodResolver(UserLoginSchema),
  });

  const onSubmit = (data: UserLoginType) => {

    axiosClient.post('/login', data)
      .then(({data}) => {
        setAuthUser(data.user);
        setToken(data.token);

      })
      .catch(error => {
        const response = error.response;

        if (response && response.status === 422) {
          if (response.data.errors) {
            let errors = response.data.errors;

            if (errors.email) {
              setError("email", {type: "server", message: errors.email[0]})
            }
            if (errors.password) {
              setError("password", {type: "server", message: errors.password[0]})
            }
          }
        } else if (response.data.message) {
          setError("password", {type: "server", message: response.data.message})
        }
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="user">

      <div className="text-center">
        <h1 className="h4 text-gray-900 mb-4">Login into your account!</h1>
      </div>

      <div className="mb-3">
        <input {...register("email")}
               type="email"
               className="form-control form-control-user"
               id="exampleInputEmail" aria-describedby="emailHelp"
               placeholder="Email Address..."
        />
        {errors.email && <p className="text-danger ps-3 mt-2"> {errors.email.message}</p>}
      </div>
      <div className="mb-3">
        <input {...register("password")}
               type="password"
               className="form-control form-control-user"
               id="exampleInputPassword"
               placeholder="Password"
        />
        {errors.password && <p className="text-danger ps-3 mt-2"> {errors.password.message}</p>}
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
        <button className="btn btn-primary btn-user text-white" disabled={isSubmitting}>
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
