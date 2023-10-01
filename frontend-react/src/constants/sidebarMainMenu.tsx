import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import AddTaskIcon from '@mui/icons-material/AddTask';
import SettingsIcon from '@mui/icons-material/Settings';
import {ReactComponentElement} from "react";
import {To} from "react-router-dom";

export interface ISidebarListItem {
  id: number,
  label: string,
  icon: ReactComponentElement<any>,
  path?: To,
  isOpened?: boolean,
  children?: ISidebarListItem[]
}

export const sidebarMainMenu: ISidebarListItem[] = [
  {
    id: 1,
    label: 'Dashboard',
    icon: <DashboardRoundedIcon/>,
    path: '/dashboard',
  },
  {
    id: 2,
    label: 'Users',
    icon: <PersonIcon/>,
    path: '/users',
    children: [
      {
        id: 2.1,
        label: 'Users list',
        icon: <PeopleIcon/>,
        path: '/users-list'
      },
      {
        id: 2.2,
        label: 'Add new user',
        icon: <PersonAddIcon/>,
        path: '/users-create'
      }
    ]
  },
  {
    id: 3,
    label: 'Exercises',
    icon: <ModelTrainingIcon/>,
    children: [
      {
        id: 3.1,
        label: 'Todos',
        icon: <AddTaskIcon/>,
        path: '/todo-list'
      },
      {
        id: 3.2,
        label: 'Settings',
        icon: <SettingsIcon/>,
        path: '/settings'
      }
    ]
  }
]
