import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {UserCreateType, UserFormErrors} from "../../models/User";
import axiosClient from "../../axios-client";
import {useStateContext} from "../../contexts/ContextProvider";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import UserCreateForm from "./components/UserCreateForm";

export default function CreatePage() {
  const {setNotification} = useStateContext();
  const [errors, setErrors] = useState<UserFormErrors | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();


  const handleUserCreate = (userData: UserCreateType) => {
    setLoading(true);

    axiosClient.post(`/users`, userData)
      .then(() => {
        setLoading(false);
        navigate("/users-list");
        setNotification("User was successfully created!");
      })
      .catch((error) => {
        setLoading(false);

        const response = error.response;

        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })
  }

  return (
    <div className="card border-0 shadow-lg">
      {loading && (
        <div style={{backgroundColor: 'rgba(0, 0, 0, .1)'}}
             className="position-absolute d-flex justify-content-center align-items-center top-0 start-0 w-100 h-100 z-2">
          <div className="spinner-border text-center" role="status" style={{width: '5rem', height: '5rem'}}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="card-header">
        <div className="d-flex flex-row justify-content-between py-2">
          <div className="align-self-start">
            <h1 className="fs-2">Create new user</h1>
          </div>
          <div className="align-self-end">

            <button onClick={() => navigate("/users-list")}
                    className="btn btn-success btn-lg text-white align-self-end">
              <FontAwesomeIcon icon={faArrowLeft} className="me-2"/>Back to users
            </button>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="row justify-content-center">

          <div className="col-12 col-xxl-9">
            <div className="row align-items-center justify-content-center">
              <div className="col-12 col-xl-8 col-xxl-8">
                <UserCreateForm serverErrors={errors} onUserCreate={handleUserCreate}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
