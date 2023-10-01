import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import AddTaskIcon from '@mui/icons-material/AddTask';
import SettingsIcon from '@mui/icons-material/Settings';
import {ReactComponentElement} from "react";

export interface ISidebarListGroup {
  id: number,
  label: string,
  icon: ReactComponentElement<any>,
  path: string | null,
  isOpened?: boolean,
  children?: ISidebarListGroup[]
}

export const sidebarMainMenu: ISidebarListGroup[] = [
  {
    id: 1,
    label: 'Dashboard',
    icon: <BarChartIcon/>,
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
    path: null,
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
