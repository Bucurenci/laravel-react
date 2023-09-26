import UserCreateForm from "../UserCreateForm";
import {UserFormErrors, UserCreateType} from "../../../../models/User";

interface UserCreateProps {
  errors: UserFormErrors | null,
  onUserCreate: (user: UserCreateType) => void
}

export default function UserCreate({onUserCreate, errors}: UserCreateProps) {

  return (

    <div className="row justify-content-center">

      <div className="col-12 col-xxl-9">
        <div className="row align-items-center justify-content-center">
          <div className="col-12 col-xl-8 col-xxl-8">
            <UserCreateForm serverErrors={errors} onUserCreate={onUserCreate}/>
          </div>
        </div>
      </div>
    </div>
  );
}
