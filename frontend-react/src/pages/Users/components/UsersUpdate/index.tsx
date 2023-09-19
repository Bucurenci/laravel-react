import UserForm from "../../../../components/UserForm";
import AvatarForm from "../AvatarForm";
import {User, UserFormErrors} from "../../../../models/User";

interface UserUpdateProps {
  user: User,
  errors: UserFormErrors | null,
  onUserUpdate: (user: User) => void,
  onAvatarUpdate: (user: User, file: File) => void,
  onAvatarDelete: (user: User) => void
}

export default function UsersUpdate({user, onUserUpdate, onAvatarUpdate, onAvatarDelete, errors}: UserUpdateProps) {

  return (

    <div className="row justify-content-center">

      <div className="col-12 col-xxl-9">
        <div className="row align-items-center justify-content-center">
          {user.id && (
            <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-4 mb-xl-0 text-center">
              <AvatarForm user={user} errors={errors} onUpdate={onAvatarUpdate}
                          onDelete={onAvatarDelete}/>
            </div>
          )}
          <div className="col-12 col-xl-8 col-xxl-8">
            <UserForm user={user} errors={errors} onUserUpdate={onUserUpdate}/>
          </div>
        </div>
      </div>
    </div>
  );
}
