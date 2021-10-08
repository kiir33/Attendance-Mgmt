import { Dashboard, People, Storage, OtherHouses, Assessment, Person, Message } from "@mui/icons-material";
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Component } from "react";
import { connect } from "react-redux";
import { getCookie } from "../utils/cookies";

export default class SideBar extends Component {



  render() {

    const adminNavLinks = [
      { icon: <Dashboard color="light" />, text: "Dashboard" },
      { icon: <People color="light" />, text: "Employees" },
      { icon: <Storage color="light" />, text: "Attendance" },
      { icon: <Message color="light" />, text: "Requests" },
      { icon: <Assessment color="light" />, text: "Report" }];
    const userNavLinks = [
      { icon: <Dashboard color="light" />, text: "Dashboard" },
      { icon: <Person color="light" />, text: "User Profile" },
      { icon: <Storage color="light" />, text: "Attendance" },
      { icon: <Message color="light" />, text: "Requests" },
    ];
    const navLinks = getCookie("role") === "3" ? userNavLinks : adminNavLinks;

    return (
      <Box sx={{ bgcolor: 'primary.main', color: 'light.main', height: '100%', minHeight: '100vh' }}>
        <List>
          <ListItem>
            <ListItemText>Welcome {"user"}</ListItemText>
          </ListItem>
          <Divider />
          {navLinks.map((element, index) => {
            return (<ListItem key={index}>
              <ListItemButton onClick={() => {
                this.props.history.push(`/${element.text.toLowerCase().replace(" ", "")}`)
              }}>
                <ListItemIcon >
                  {element.icon}
                </ListItemIcon>
                <ListItemText>
                  {element.text}
                </ListItemText>
              </ListItemButton>
            </ListItem>)
          })}
        </List>
      </Box>
    )
  }
}

const mapStateToProps = (state) => {
  return { ...state.root }
}

SideBar = connect(mapStateToProps)(SideBar);