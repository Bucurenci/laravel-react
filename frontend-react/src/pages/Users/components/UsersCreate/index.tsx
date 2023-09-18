import UserForm from "../../../../components/UserForm";
import {UserType} from "../../index";

export default function UsersCreate({onUserCreate, errors}) {

  return (

    <div className="row justify-content-center">

      <div className="col-12 col-xxl-9">
        <div className="row align-items-center justify-content-center">
          <div className="col-12 col-xl-8 col-xxl-8">
            <UserForm errors={errors} onUserSubmit={onUserCreate}/>
          </div>
        </div>
      </div>
    </div>
  );
}
