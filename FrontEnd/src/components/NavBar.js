import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = ({ open, toggleSidebar }) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleSidebar}
      variant="persistent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        <ListItem button onClick={toggleSidebar}>
          <ListItemText primary="Dashboard" component={Link} to="/" />
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemText primary="Apply" component={Link} to="/apply" />
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemText primary="Admin Review" component={Link} to="/admin/review" />
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemText primary="Download Admission Letter" component={Link} to="/download/:appId" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={toggleSidebar}>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
