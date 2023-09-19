import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import SettingsList from "./components/SettingsList";
import Modal from "../../components/Modal";
import ModalForm from "./components/ModalForm";
import {useStateContext} from "../../contexts/ContextProvider";

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
  const [showModal, setShowModal] = useState<boolean>(false);

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
    <div className="card border-0 shadow-lg">
      <div className="card-header">
        <div className="d-flex flex-row justify-content-between py-2">
          <div className="align-self-start">
            <h1 className="h2">App Settings</h1>
          </div>
          <div className="align-self-end">
            <button onClick={() => setShowModal(true)} className="btn btn-success btn-lg text-white align-self-end">Add
              new
            </button>
          </div>
        </div>
      </div>
      <div className="card-body">
        <SettingsList settings={settings} loading={loading} onSettingDelete={handleSettingDelete}/>
      </div>
      <Modal title="Add new setting" showModal={showModal} setShowModal={setShowModal}>
        <ModalForm/>
      </Modal>
    </div>
  );
}
