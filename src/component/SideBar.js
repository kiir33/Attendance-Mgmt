import { Dashboard } from "@mui/icons-material";
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Component } from "react";
import { theme } from "../utils/theme";

export default class SideBar extends Component {



  render() {
    return (
      <Box sx={{bgcolor: 'primary.main', color: 'light.main', minHeight:'100%'}}>
        <List>
          <ListItem>
            <ListItemText>Welcome {"user"}</ListItemText>
          </ListItem>
          <Divider />
          {["Dashboard", "Employees", "Attendance", "Leave", "Report"].map((element, index) => {
            return (<ListItem key={index}>
              <ListItemButton>
                <ListItemIcon>
                  <Dashboard color="light"/>
                </ListItemIcon>
                <ListItemText>
                  {element}
                </ListItemText>
              </ListItemButton>
            </ListItem>)
          })}
        </List>
      </Box>
    )
  }
}