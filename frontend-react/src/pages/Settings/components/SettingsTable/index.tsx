import SettingsItem from "../SettingsItem";

export default function SettingsTable({settings, loading}) {

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
            <td colSpan="3">
              <div className="text-center fs-4 my-3">Loading...</div>
            </td>
          </tr>
          :
          settings.map((settingData) => (
            <SettingsItem key={settingData.id} setting={settingData} />
          ))
        }
        </tbody>
      </table>
    </div>
  );
}
