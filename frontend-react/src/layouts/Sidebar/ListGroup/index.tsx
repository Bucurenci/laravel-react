import {useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {Collapse, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {ISidebarListItem} from "../../../constants/sidebarMainMenu";

interface ListGroupProps {
  item: ISidebarListItem,
  key: number
}

export default function ListGroup({item}: ListGroupProps) {
  const [isOpened, setIsOpened] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    if (item.children && (item.path === location.pathname || item.children.find(child => child.path === location.pathname))) {
      setIsOpened(true);
    }
  }, []);

  const handleClick = (menuItem: ISidebarListItem) => {

    setIsOpened(prev => !prev);

    if (menuItem.path) {
      navigate(menuItem.path);
    }
  };

  return (
    <>
      <ListItemButton onClick={() => handleClick(item)}>
        <ListItemIcon>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.label}/>
        {item.children && (isOpened ? <ExpandLess/> : <ExpandMore/>)}
      </ListItemButton>

      {item.children && (
        <Collapse in={isOpened} timeout="auto">
          <List component="div" disablePadding>

            {item.children.map((child: ISidebarListItem) => {
                return (
                  <ListItemButton
                    key={child.id}
                    sx={{pl: 4}}
                    onClick={() => child.path && navigate(child.path)}
                  >
                    <ListItemIcon>
                      {child.icon}
                    </ListItemIcon>
                    <ListItemText primary={child.label}/>
                  </ListItemButton>
                )
              }
            )}
          </List>
        </Collapse>
      )}
    </>
  );
}
