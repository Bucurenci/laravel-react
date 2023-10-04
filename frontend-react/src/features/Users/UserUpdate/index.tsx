import {useNavigate, useSearchParams} from "react-router-dom";
import {User, UserFormErrors, UserUpdateType} from "../../../models/User";
import {useStateContext} from "../../../contexts/ContextProvider";
import UserUpdateForm from "../components/UserUpdateForm";
import AvatarForm from "../components/AvatarForm";
import {Box, Grid, Paper, Typography} from "@mui/material";
import Loading from "../../../components/Loading";
import {useUserData} from "../../../hooks/Api/useUserData";
import {useUpdateUser} from "../../../hooks/Api/useUpdateUser";
import {useEffect, useState} from "react";
import GoBackButton from "../../../components/GoBackButton";
import {useUpdateUserAvatar} from "../../../hooks/Api/useUpdateUserAvatar";
import {useDeleteUserAvatar} from "../../../hooks/Api/useDeleteUserAvatar";
import FetchError from "../../../components/FetchError";

interface UserUpdateProps {
  userId: number
}

export default function UserUpdate({userId}: UserUpdateProps) {
  const {setNotification} = useStateContext();
  const [errors, setErrors] = useState<UserFormErrors | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const usersPage = searchParams.get('users-page');

  const {
    data: user,
    isLoading: isGetUserLoading,
    isError: isGetUserError,
    refetch
  } = useUserData({
    id: userId,
    page: usersPage ? parseInt(usersPage) : 1
  });
  const {
    mutate: updateUser,
    isLoading: isUpdateUserLoading,
    isSuccess: isUpdateUserSuccess,
    error: updateUserError
  } = useUpdateUser({
    page: usersPage ? parseInt(usersPage) : 1
  });
  const {
    mutate: updateUserAvatar,
    isLoading: isUpdateAvatarLoading,
    isSuccess: isUpdateAvatarSuccess,
    error: updateAvatarError
  } = useUpdateUserAvatar({
    userId: userId,
    page: usersPage ? parseInt(usersPage) : 1
  });
  const {
    mutate: deleteUserAvatar,
    isLoading: isDeleteAvatarLoading,
    isSuccess: isDeleteAvatarSuccess,
    error: deleteAvatarError
  } = useDeleteUserAvatar({
    userId: userId,
    page: usersPage ? parseInt(usersPage) : 1
  });

  useEffect(() => {
    if (isUpdateUserSuccess) {
      setNotification("User was successfully updated!");
      navigate(-1);
    }

    if (isUpdateAvatarSuccess) {
      setNotification("User`s image was successfully updated!");
    }

    if (isDeleteAvatarSuccess) {
      setNotification("User`s image was successfully deleted!");
    }

    if (updateUserError || updateAvatarError || deleteAvatarError) {

      if (updateUserError?.response.status === 422 || updateAvatarError?.response.status === 422) {
        if (updateUserError) {
          setErrors({...errors, ...updateUserError.response.data.errors})
        }
        if (updateAvatarError) {
          setErrors({...errors, ...updateAvatarError.response.data.errors})
        }
      } else {
        setNotification("An unexpected error occurred... Please try again!", "error");
      }
    }
  }, [isUpdateUserSuccess, isUpdateUserSuccess, isDeleteAvatarSuccess, updateUserError, updateAvatarError, deleteAvatarError]);

  const handleUserUpdate = (formData: UserUpdateType) => {
    updateUser(formData);
  }

  const handleAvatarUpdate = (user: User, imageFile: File) => {
    let formData = new FormData();
    formData.append('avatar', imageFile);
    updateUserAvatar(formData);
  }

  const handleAvatarDelete = (user: User) => {
    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }
    deleteUserAvatar(user.id);
  }

  return (
    <>
      <Grid container minHeight={75} display="flex" flexDirection="row"
            justifyContent="space-between" alignItems="top">
        <Box component="div">
          <Typography variant="h4" mb={0} gutterBottom>Edit
            User: {user?.first_name ?? user?.first_name} {user?.last_name ?? user?.last_name}</Typography>
        </Box>
        <Box component="div">
          <GoBackButton>Go Back</GoBackButton>
        </Box>
      </Grid>


      <Paper sx={{position: "relative", minHeight: '400px'}}>

        {isGetUserLoading ? (
          <Loading isLoading={true}/>
        ) : (isGetUserError ? (
            <FetchError onFetch={refetch}/>
          ) : (
            <>
              <Loading isLoading={isUpdateUserLoading}/>

              <Grid container display="flex" justifyContent="center" sx={{p: {xs: 2, sm: 3, md: 4}}}>
                <Grid item xs={12} sm={12} md={12} lg={11} xl={9}>

                  <Grid container display="flex" justifyContent="center" alignItems="center"
                        columnSpacing={{xs: 0, lg: 3}}>

                    <Grid item xs={12} lg={4} sx={{mb: {xs: 3, lg: 0}}}>
                      <Box sx={{position: 'relative'}}>
                        <Loading isLoading={isUpdateAvatarLoading || isDeleteAvatarLoading}/>
                        <AvatarForm user={user} serverErrors={errors}
                                    onUpdate={handleAvatarUpdate}
                                    onDelete={handleAvatarDelete}/>
                      </Box>
                    </Grid>

                    <Grid item xs={12} lg={8}>
                      <UserUpdateForm user={user} serverErrors={errors} onUserUpdate={handleUserUpdate}/>
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>
            </>
          )
        )}
      </Paper>
    </>
  );
}
