import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import SettingsTable from "./components/SettingsTable";
import Modal from "../../components/Modal";
import ModalForm from "./components/ModalForm";

export default function Settings() {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
        <SettingsTable settings={settings} loading={loading}/>
      </div>
      <Modal title="Add new setting" showModal={showModal} setShowModal={setShowModal}>
        <ModalForm/>
      </Modal>
    </div>
  );
}
