import {useParams} from "react-router-dom"
import UsersList from "../../../features/Users/UsersList";

export default function UserListPage() {
  const {page} = useParams();

  if (page) {
    let intPage = parseInt(page);

    if (isNaN(intPage)) {
      intPage = 1;
    }

    return (
      <UsersList page={intPage}/>
    );
  } else {
    return <UsersList/>
  }
}
