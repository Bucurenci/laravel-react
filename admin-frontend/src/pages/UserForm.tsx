import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axiosClient from "../axios-client";
import {useStateContext} from "../contexts/ContextProvider";

export default function UserForm() {

  const {setNotification} = useStateContext();
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: null,
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  if (id) {
    useEffect(() => {
      setLoading(true);

      axiosClient.get(`/users/${id}`)
        .then(({data}) => {
          setLoading(false);
          setUser(data);
        })
        .catch(error => {
          setLoading(false);
        });
    }, []);
  }

  const updateUser = () => {
    axiosClient.put(`/users/${user.id}`, user)
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
    axiosClient.post(`/users`, user)
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

  return (
      <div className="card pb-5">
        <div className="row justify-content-center">
          <div className="col-12 text-center my-5">
            <h1>
              {user.id && `Edit User: ${user.first_name} ${user.last_name}`}
              {!user.id && `Add new User`}
            </h1>
          </div>

          <form onSubmit={onSubmit} className="user col col-md-9 col-xl-7">

            {loading &&
              <div className="row">
                <div className="col text-center"><h2>Loading...</h2></div>
              </div>
            }

            {!loading &&
              <div>

                <div className="row mb-3">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <input type="text" value={user.first_name} onChange={ev => setUser({...user, first_name: ev.target.value})} className="form-control form-control-user" id="exampleFirstName"
                           placeholder="First Name"/>
                    {errors && errors.first_name && <div className="text-danger ps-3 mt-2">{errors.first_name[0]}</div>}
                  </div>
                  <div className="col-sm-6">
                    <input type="text" value={user.last_name} onChange={ev => setUser({...user, last_name: ev.target.value})} className="form-control form-control-user" id="exampleLastName"
                           placeholder="Last Name"/>
                    {errors && errors.last_name && <div className="text-danger ps-3 mt-2">{errors.last_name[0]}</div>}
                  </div>
                </div>
                <div className="mb-3">
                  <input type="email" value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} className="form-control form-control-user" id="exampleInputEmail"
                         placeholder="Email Address"/>
                  {errors && errors.email && <div className="text-danger ps-3 mt-2">{errors.email[0]}</div>}
                </div>
                <div className="row mb-3">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <input type="password" onChange={ev => setUser({...user, password: ev.target.value})} className="form-control form-control-user"
                           id="exampleInputPassword" placeholder="Password"/>
                  </div>
                  <div className="col-sm-6">
                    <input type="password" onChange={ev => setUser({...user, password_confirmation: ev.target.value})} className="form-control form-control-user"
                           id="exampleRepeatPassword" placeholder="Repeat Password" />
                  </div>
                  <div className="col">
                    {errors && errors.password && <div className="text-danger ps-3 mt-2">{errors.password[0]}</div>}
                    {errors && errors.password_confirmation && <div className="text-danger ps-3 mt-2">{errors.password_confirmation[0]}</div>}
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <button className="btn btn-primary btn-user text-white">
                    {user.id && `Edit`}
                    {!user.id && `Create`}
                  </button>
                </div>
              </div>
            }
          </form>
        </div>
      </div>
  );
}
