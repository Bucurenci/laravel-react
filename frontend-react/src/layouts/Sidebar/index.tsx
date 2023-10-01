import {sidebarMainMenu} from "../../constants/sidebarMainMenu";
import {
  Divider,
  List,
  ListSubheader,
} from "@mui/material";
import ListGroup from "./ListGroup";

export default function Sidebar() {

  return (
    <>
      <Divider/>

      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Menu
          </ListSubheader>
        }
      >
        {sidebarMainMenu.map((item) => {
          return <ListGroup key={item.id} item={item}/>
        })}

      </List>
    </>
  );
}
