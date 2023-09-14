import {useEffect, useState} from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import axiosClient from "../../axios-client";
import {useStateContext} from "../../contexts/ContextProvider";
import UserForm from "./components/UserForm";
import AvatarForm from "./components/AvatarForm";

export interface UserType {
  id: number | null;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string | null;
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
    avatar: null,
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState();
  const navigate = useNavigate();

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient.get(`/users/${id}`)
        .then(({data}) => {
          setUser(data);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
        });
    }, []);
  }

  const handleUserSubmit = (formData: UserType) => {

    if (user.id) {
      updateUser(formData);
    } else {
      createUser(formData);
    }
  }

  const updateUser = (formData: UserType) => {

    axiosClient.put(`/users/${user.id}`, formData)
      .then((response) => {

        if (user.id == loggedInUser.id) {
          setLoggedInUser(response.data);
        }
        setNotification("User was successfully updated!");
        navigate('/users');
      })
      .catch(({response}) => {

        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })
  }

  const createUser = (formData: UserType) => {

    axiosClient.post(`/users`, formData)
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

  const handleAvatarUpdate = (imageFile) => {

    let formData = new FormData();

    formData.append('avatar', imageFile);
    
    console.log(imageFile);

    /*axiosClient.patch(`/users/${user.id}`, formData)
      .then((response) => {

        if (user.id == loggedInUser.id) {
          setLoggedInUser(response.data);
        }
        setNotification("User was successfully updated!");
        navigate('/users');
      })
      .catch(({response}) => {

        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })*/
  }

  const handleAvatarDelete = () => {

  }

  return (
    <div className="card border-0 shadow-lg">
      <div className="card-header">

        <div className="d-flex flex-row justify-content-between py-2">
          <div className="align-self-start">
            <h1 className="h2">
              {id ? `Edit User: ${user?.first_name} ${user?.last_name}` : `Add new User`}
            </h1>
          </div>
          <div className="align-self-end">
            <Link to="/users" className="btn btn-success btn-lg text-white align-self-end"><i
              className="fa fa-arrow-left me-2"></i>Back to users</Link>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="row  justify-content-center">
          {loading ? (
              <div className="col text-center"><h2>Loading...</h2></div>
            )
            : (
              <div className="col-12 col-xxl-9">
                <div className="row align-items-center">
                  <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-4 mb-xl-0">
                    <AvatarForm user={user} errors={errors} onUpdate={handleAvatarUpdate}
                                onDelete={handleAvatarDelete}/>
                  </div>
                  <div className="col-12 col-xl-8 col-xxl-8">
                    <UserForm user={user} errors={errors} onSubmit={handleUserSubmit}/>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
