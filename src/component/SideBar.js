import { Dashboard, People, Storage, Person, Message, HolidayVillage } from "@mui/icons-material";
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Component } from "react";
import { connect } from "react-redux";
import { getCookie } from "../utils/cookies";
import { fetchCurrentUser } from "../features/user/userDetailSlice";

export default class SideBar extends Component {

  componentDidMount() {
    this.props.dispatch(fetchCurrentUser())
  }

  render() {
    console.log(this.props)
    const userDetail = this.props.currentUserData;
    const adminNavLinks = [
      { icon: <Dashboard color="light" />, text: "Dashboard" },
      { icon: <People color="light" />, text: "Employees" },
      { icon: <Storage color="light" />, text: "Attendance" },
      { icon: <Message color="light" />, text: "Requests" },
      { icon: <HolidayVillage color="light" />, text: "Holidays" }];
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
            <ListItemText>
              <Typography variant="body1">
                Welcome <br/> {userDetail.name}
                <br/>
              </Typography>
              <Divider/>
              <br/>
              <Typography variant="body2">
                Email: {userDetail.email}
              </Typography>
            </ListItemText>
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
  return { ...state.userDetail }
}

SideBar = connect(mapStateToProps)(SideBar);