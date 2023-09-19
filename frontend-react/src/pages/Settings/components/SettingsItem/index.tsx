import {useState} from "react";
import {SettingItem} from "../../index";

interface SettingsItemProps {
  setting: SettingItem,
  onDelete: (settingId: number) => void
}

export default function SettingsItem({setting, onDelete}: SettingsItemProps) {
  const settingValue = JSON.parse(setting.value);
  const [editable, setEditable] = useState<boolean>(false);
  // const [newSettingValue, setNewSettingValue] = useState<SettingItem>(settingValue);

  const handleSave = () => {
    setEditable(false);
  }

  const handleDelete = () => {
    onDelete(setting.id);
  }

  const onSettingChange = (/*ev: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>*/) => {
    // setNewSettingValue(ev.target.value);
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
