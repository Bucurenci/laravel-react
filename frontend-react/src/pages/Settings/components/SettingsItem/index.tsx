import axiosClient from "../../../../axios-client";
import {useStateContext} from "../../../../contexts/ContextProvider";
import {useRef, useState} from "react";

export default function SettingsItem({setting}) {
  const settingValue = JSON.parse(setting.value);
  const {setNotification} = useStateContext();
  const [editable, setEditable] = useState(false);
  const [newSettingValue, setNewSettingValue] = useState(settingValue);

  const handleSave = () => {
    setEditable(false);
  }


  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this setting?")) {
      return;
    }

    axiosClient.delete(`/settings/${setting.id}`)
      .then((response) => {
        console.log(response);
        setNotification("Setting was successfully deleted! ");
      }).catch(({response}) => {
      console.log(response);
    })
  }

  const onSettingChange = (ev) => {
    setNewSettingValue(ev.target.value);
  }

  const renderSwitchType = () => {

    switch (setting.type) {

      case "text":
        return <input onChange={onSettingChange} type="email" defaultValue={settingValue.value}
                      className="form-control form-control-lg w-75" autoFocus={true}/>;
      case "email":
        return <input onChange={onSettingChange} type="email" defaultValue={settingValue.value}
                      className="form-control form-control-lg w-75" autoFocus={true}/>;
      case "select":
        return <select onChange={onSettingChange} autoFocus={true}>
          <option value="1">True</option>
          <option value="0">False</option>
        </select>;

      default:
        return <h1>No project match</h1>
    }
  }

  return (
    <tr>
      <td className="fs-4 ps-3">{setting.name}</td>
      <td className="fs-5">
        {editable ?
          renderSwitchType()
          :
          setting.value ? JSON.parse(setting.value).value : ''
        }
      </td>
      <td className="text-end pe-3">
        {editable ?
          <button className="btn btn-primary btn-lg" onClick={handleSave}>Save</button>
          :
          <button className="btn btn-primary btn-lg" onClick={() => setEditable(true)}>Edit</button>
        }
        <button className="btn btn-danger btn-lg ms-2" onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}
