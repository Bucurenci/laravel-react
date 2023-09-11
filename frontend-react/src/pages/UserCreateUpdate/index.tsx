import {useEffect, useRef, useState} from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import axiosClient from "../../axios-client";
import {useStateContext} from "../../contexts/ContextProvider";
import UserForm from "./components/UserForm";

export interface UserType {
  id: number|null;
  first_name: string;
  last_name: string;
  email: string
  password?: string;
  password_confirmation?: string;
  created_at?: string;
}

export default function UserCreateUpdate() {

  const {id} = useParams();
  const {loggedInUser, setLoggedInUser, setNotification} = useStateContext();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserType>({
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState();
  const navigate = useNavigate();
  const formRef = useRef();

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

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (user.id) {
      updateUser();
    }
    else {
      createUser();
    }
  }

  const updateUser = () => {

    axiosClient.put(`/users/${user.id}`, formRef.current.getUserValues())
      .then(() => {

      if (user.id == loggedInUser.id) {
        setLoggedInUser(formRef.current.getUserValues());
      }
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

    axiosClient.post(`/users`, formRef.current.getUserValues())
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

  return (
    <div className="card border-0 shadow-lg">
      <div className="card-header">

        <div className="d-flex flex-row justify-content-between py-2">
          <div className="align-self-start">
            <h1 className="h2">
              {id ? `Edit User: ${user.first_name} ${user.last_name}` : `Add new User`}
            </h1>
          </div>
          <div className="align-self-end">
            <Link to="/users" className="btn btn-success btn-lg text-white align-self-end"><i className="fa fa-arrow-left me-2"></i>Back to users</Link>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="row  justify-content-center">
          {loading
            ?
            <div className="row">
              <div className="col text-center"><h2>Loading...</h2></div>
            </div>
            :
            <UserForm ref={formRef} user={user} errors={errors} onSubmit={handleSubmit}/>
          }
        </div>
      </div>
      </div>
  );
}
