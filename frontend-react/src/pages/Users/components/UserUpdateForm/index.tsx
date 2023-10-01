import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import {UserUpdateSchema, UserUpdateType, User, UserFormErrors} from "../../../../models/User";

interface UserUpdateFormProps {
  user: User,
  serverErrors: UserFormErrors | null,
  onUserUpdate: (formData: UserUpdateType) => void
}

export default function UserUpdateForm({user, serverErrors, onUserUpdate}: UserUpdateFormProps) {

  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<UserUpdateType>({
    resolver: zodResolver(UserUpdateSchema), defaultValues: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    }
  });

  useEffect(() => {

    if (serverErrors) {

      if (serverErrors.first_name) {
        setError("first_name", {type: "server", message: serverErrors.first_name[0]})
      }
      if (serverErrors.last_name) {
        setError("last_name", {type: "server", message: serverErrors.last_name[0]})
      }
      if (serverErrors.email) {
        setError("email", {type: "server", message: serverErrors.email[0]})
      }
      if (serverErrors.password) {
        setError("password", {type: "server", message: serverErrors.password[0]})
      }
      if (serverErrors.password_confirmation) {
        setError("password_confirmation", {type: "server", message: serverErrors.password_confirmation[0]})
      }
    }
  }, [serverErrors])

  const onSubmit = (data: UserUpdateType) => {
    onUserUpdate(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="user col" autoComplete="off">

      <div className="row align-items-center justify-content-center">

        <div className="col">
          <div className="row">
            <div className="col-md-6 mb-3 mb-md-0">
              <input {...register("first_name")}
                     type="text" autoComplete="off"
                     className="form-control form-control-user"
                     placeholder="First Name"/>
              {errors.first_name &&
                <p className="text-danger ps-3 mt-2"> {errors.first_name.message}</p>}
            </div>
            <div className="col-md-6 mb-3">
              <input {...register("last_name")}
                     type="text" autoComplete="off"
                     className="form-control form-control-user"
                     placeholder="Last Name"/>
              {errors.last_name &&
                <p className="text-danger ps-3 mt-2"> {errors.last_name.message}</p>}
            </div>
          </div>
          <div className="mb-3">
            <input {...register("email")}
                   type="email"
                   className="form-control form-control-user"
                   autoComplete="off"
                   placeholder="Email Address"/>
            {errors.email &&
              <p className="text-danger ps-3 mt-2"> {errors.email.message}</p>}
          </div>
          <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <input {...register("password")}
                     type="password"
                     className="form-control form-control-user"
                     autoComplete="new-password"
                     placeholder="Password"/>
            </div>
            <div className="col-md-6">
              <input {...register("password_confirmation")}
                     type="password"
                     className="form-control form-control-user"
                     autoComplete="new-password"
                     placeholder="Repeat Password"/>
            </div>
            <div className="col">
              {errors.password &&
                <p className="text-danger ps-3 mt-2"> {errors.password.message}</p>}
              {errors.password_confirmation &&
                <p className="text-danger ps-3 mt-2"> {errors.password_confirmation.message}</p>}
            </div>
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-primary btn-user text-white" disabled={isSubmitting}>
              {user?.id ? `Save` : 'CreatePage'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
