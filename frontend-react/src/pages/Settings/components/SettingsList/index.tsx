import SettingsItem from "../SettingsItem";
import {SettingItem} from "../../index";

interface SettingsListProps {
  settings: SettingItem[],
  loading: boolean,
  onSettingDelete: (userId: number) => void
}

export default function SettingsList({settings, loading, onSettingDelete}: SettingsListProps) {

  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead>
        <tr>
          <th className="p-3 fs-5 w-25">Name</th>
          <th className="p-3 fs-5">Value</th>
          <th className="p-3 fs-5 text-end">Actions</th>
        </tr>
        </thead>
        <tbody>
        {loading ?
          <tr>
            <td colSpan={3}>
              <div className="text-center fs-4 my-3">Loading...</div>
            </td>
          </tr>
          :
          settings.map((settingData) => (
            <SettingsItem key={settingData.id} setting={settingData} onDelete={onSettingDelete}/>
          ))
        }
        </tbody>
      </table>
    </div>
  );
}
