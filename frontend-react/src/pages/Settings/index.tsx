import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import SettingsList from "./components/SettingsList";
import ModalForm from "./components/ModalForm";
import {useStateContext} from "../../contexts/ContextProvider";
import {
  Box,
  Button, Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Typography
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

export interface SettingItem {
  id: number,
  name: string,
  type: string,
  value: string
}

export default function Settings() {
  const {setNotification} = useStateContext();
  const [settings, setSettings] = useState<SettingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  useEffect(() => {
    getSettings();
  }, []);

  const getSettings = () => {
    setLoading(true);

    axiosClient.get('/settings')
      .then(({data}) => {
        setSettings(data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      })
  }

  const handleSettingDelete = (settingId: number) => {
    if (!window.confirm("Are you sure you want to delete this setting?")) {
      return;
    }

    axiosClient.delete(`/settings/${settingId}`)
      .then(() => {

        setSettings(settings.filter((setting) => (setting.id != settingId)));

        setNotification("Setting was successfully deleted! ");
      }).catch(({response}) => {
      console.error(response);
    })
  }

  return (
    <>
      <Grid container minHeight={75} display="flex" flexDirection="row"
            justifyContent="space-between" alignItems="top">
        <Box component="div">
          <Typography variant="h4" mb={0} gutterBottom>App Settings</Typography>

        </Box>
        <Box component="div">
          <Button onClick={() => setShowDialog(true)} variant="contained" size="large"
                  startIcon={<AddIcon/>} sx={{mb: {xs: 3, sm: 0}, mt: {xs: 2, sm: 0}}}>
            Add new setting
          </Button>
        </Box>
      </Grid>

      <Paper sx={{p: 2}}>
        <SettingsList settings={settings} loading={loading} onSettingDelete={handleSettingDelete}/>

        <Dialog
          onClose={() => setShowDialog(false)}
          aria-labelledby="customized-dialog-title"
          open={showDialog}
          maxWidth="lg"
        >
          <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
            Create new setting
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setShowDialog(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon/>
          </IconButton>
          <DialogContent dividers>
            <ModalForm/>
          </DialogContent>
        </Dialog>
      </Paper>
    </>
  );
}
