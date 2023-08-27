import {useEffect, useRef, useState} from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import axiosClient from "../axios-client";
import {useStateContext} from "../contexts/ContextProvider";

interface UserType {
  id: number|null;
  first_name: string;
  last_name: string;
  email: string
  password?: string;
  password_confirmation?: string;
  created_at?: string;
}

export default function UserForm() {

  const {id} = useParams();
  const {setNotification} = useStateContext();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState();
  const navigate = useNavigate();

  const firstNameRef = useRef<HTMLInputElement>(null!);
  const lastNameRef = useRef<HTMLInputElement>(null!);
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const passwordConfirmationRef = useRef<HTMLInputElement>(null!);

  if (id) {
    useEffect(() => {
      axiosClient.get(`/users/${id}`)
        .then(({data}) => {
          setUser(data);
        })
        .catch(error => {
        });
    }, []);
  }

  const getUserValues = (): UserType => {

    let user: UserType = {
      id: id ? id : null,
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
    }

    if (passwordRef.current.value || passwordConfirmationRef.current.value) {
        user.password = passwordRef.current.value;
        user.password_confirmation = passwordConfirmationRef.current.value;
    }

    return user;
  }

  const updateUser = () => {

    axiosClient.put(`/users/${user.id}`, getUserValues())
      .then(() => {
       setNotification("User was successfully updated!");
        navigate('/users');
      })
      .catch((error) => {

        const response = error.response;

        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })
  }

  const createUser = () => {

    axiosClient.post(`/users`, getUserValues())
      .then(() => {
        setNotification("User was successfully created!");
        navigate('/users');
      })
      .catch((error) => {

        const response = error.response;

        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })
  }

  const onSubmit = (ev) => {
    ev.preventDefault();

    if (user.id) {
      updateUser();
    }
    else {
      createUser();
    }
  }

  console.log('UserForm Rendered');

  return (
    <div className="card border-0 shadow-lg">
      <div className="card-header">

        <div className="d-flex flex-row justify-content-between py-2">
          <div className="align-self-start">
            <h1 className="h2">
              {!user.id ? `Add new User` : `Edit User: ${user.first_name} ${user.last_name}`}
            </h1>
          </div>
          <div className="align-self-end">
            <Link to="/users" className="btn btn-success btn-lg text-white align-self-end"><i className="fa fa-arrow-left me-2"></i>Back to users</Link>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="row  justify-content-center">
          <form onSubmit={onSubmit} className="user col col-md-9 col-xl-7" autoComplete="off">

            {loading
              ?
              <div className="row">
                <div className="col text-center"><h2>Loading...</h2></div>
              </div>
              :
              <div>

                <div className="row mb-3">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <input defaultValue={user.first_name}
                           ref={firstNameRef}
                           type="text" autoComplete="off"
                           className="form-control form-control-user"
                           id="exampleFirstName"
                           placeholder="First Name"/>
                    {errors?.first_name && <div className="text-danger ps-3 mt-2">{errors.first_name[0]}</div>}
                  </div>
                  <div className="col-sm-6">
                    <input defaultValue={user.last_name}
                           ref={lastNameRef}
                           type="text" autoComplete="off"
                           className="form-control form-control-user"
                           id="exampleLastName"
                           placeholder="Last Name"/>
                    {errors?.last_name && <div className="text-danger ps-3 mt-2">{errors.last_name[0]}</div>}
                  </div>
                </div>
                <div className="mb-3">
                  <input defaultValue={user.email}
                         ref={emailRef}
                         type="email"
                         className="form-control form-control-user"
                         id="exampleInputEmail" autoComplete="off"
                         placeholder="Email Address"/>
                  {errors?.email && <div className="text-danger ps-3 mt-2">{errors.email[0]}</div>}
                </div>
                <div className="row mb-3">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <input ref={passwordRef}
                           type="password"
                           className="form-control form-control-user"
                           id="exampleInputPassword" autoComplete="new-password"
                           placeholder="Password"/>
                  </div>
                  <div className="col-sm-6">
                    <input ref={passwordConfirmationRef}
                           type="password"
                           className="form-control form-control-user"
                           id="exampleRepeatPassword" autoComplete="new-password"
                           placeholder="Repeat Password" />
                  </div>
                  <div className="col">
                    {errors?.password && <div className="text-danger ps-3 mt-2">{errors.password[0]}</div>}
                    {errors?.password_confirmation && <div className="text-danger ps-3 mt-2">{errors.password_confirmation[0]}</div>}
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <button className="btn btn-primary btn-user text-white">
                    {user.id ? `Save`: 'Create'}
                  </button>
                </div>
              </div>
            }
          </form>
        </div>
      </div>
      </div>
  );
}
