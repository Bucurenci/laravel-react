import UserForm from "../../../../components/UserForm";
import {NewUser, UserFormErrors} from "../../../../models/User";

interface UserCreateProps {
  errors: UserFormErrors | null,
  onUserCreate: (user: NewUser) => void
}

export default function UsersCreate({onUserCreate, errors}: UserCreateProps) {

  return (

    <div className="row justify-content-center">

      <div className="col-12 col-xxl-9">
        <div className="row align-items-center justify-content-center">
          <div className="col-12 col-xl-8 col-xxl-8">
            <UserForm serverErrors={errors} onUserCreate={onUserCreate}/>
          </div>
        </div>
      </div>
    </div>
  );
}
