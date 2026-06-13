import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
  const location = useLocation();

  const menus = [
    {
      title: "Dashboard",
      path: "/",
      icon: <DashboardIcon />,
    },
    {
      title: "Customer",
      path: "/customer",
      icon: <PeopleIcon />,
    },
    {
      title: "Transaction",
      path: "/transaction",
      icon: <ReceiptIcon />,
    },
    {
      title: "Logout",
      path: "/login",
      icon: <LogoutIcon />,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      <List>
        {menus.map((menu) => (
          <ListItemButton
            key={menu.path}
            component={Link}
            to={menu.path}
            selected={location.pathname === menu.path}
          >
            <ListItemIcon>{menu.icon}</ListItemIcon>

            <ListItemText primary={menu.title} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
