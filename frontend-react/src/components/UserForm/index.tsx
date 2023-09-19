import {SyntheticEvent, useRef} from "react";
import {NewUser, User, UserFormErrors} from "../../models/User";

interface UserFormProps {
  user?: User,
  errors: UserFormErrors | null,
  onUserUpdate?: (formData: User) => void
  onUserCreate?: (formData: NewUser) => void
}

export default function UserForm({user, errors, onUserCreate, onUserUpdate}: UserFormProps) {

  const firstNameRef = useRef<HTMLInputElement>(null!);
  const lastNameRef = useRef<HTMLInputElement>(null!);
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const passwordConfirmationRef = useRef<HTMLInputElement>(null!);

  const handleSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (onUserUpdate && user) {

      let updateUserData: User = {
        id: user.id,
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        email: emailRef.current.value,
        avatar: null,
      }

      onUserUpdate(updateUserData);

    } else if (onUserCreate) {

      let createUserData: NewUser = {
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        password_confirmation: passwordConfirmationRef.current.value
      }

      onUserCreate(createUserData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="user col" autoComplete="off">

      <div className="row align-items-center justify-content-center">

        <div className="col">

          <div className="row">
            <div className="col-md-6 mb-3 mb-md-0">
              <input defaultValue={user?.first_name ? user.first_name : ''}
                     ref={firstNameRef}
                     type="text" autoComplete="off"
                     className="form-control form-control-user"
                     id="exampleFirstName"
                     placeholder="First Name"/>
              {errors?.first_name && <div className="text-danger ps-3 my-2">{errors.first_name[0]}</div>}
            </div>
            <div className="col-md-6 mb-3">
              <input defaultValue={user?.last_name ? user.last_name : ''}
                     ref={lastNameRef}
                     type="text" autoComplete="off"
                     className="form-control form-control-user"
                     id="exampleLastName"
                     placeholder="Last Name"/>
              {errors?.last_name && <div className="text-danger ps-3 my-2">{errors.last_name[0]}</div>}
            </div>
          </div>
          <div className="mb-3">
            <input defaultValue={user?.email ? user.email : ''}
                   ref={emailRef}
                   type="email"
                   className="form-control form-control-user"
                   id="exampleInputEmail" autoComplete="off"
                   placeholder="Email Address"/>
            {errors?.email && <div className="text-danger ps-3 my-2">{errors.email[0]}</div>}
          </div>
          <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <input ref={passwordRef}
                     type="password"
                     className="form-control form-control-user"
                     id="exampleInputPassword" autoComplete="new-password"
                     placeholder="Password"/>
            </div>
            <div className="col-md-6">
              <input ref={passwordConfirmationRef}
                     type="password"
                     className="form-control form-control-user"
                     id="exampleRepeatPassword" autoComplete="new-password"
                     placeholder="Repeat Password"/>
            </div>
            <div className="col">
              {errors?.password && <div className="text-danger ps-3 my-2">{errors.password[0]}</div>}
              {errors?.password_confirmation &&
                <div className="text-danger ps-3 my-2">{errors.password_confirmation[0]}</div>}
            </div>
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-primary btn-user text-white">
              {user?.id ? `Save` : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
