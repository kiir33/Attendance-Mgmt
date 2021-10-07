import { Dashboard } from "@mui/icons-material";
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Component } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { theme } from "../utils/theme";

export default class SideBar extends Component {



  render() {

    const adminNavLinks = ["Dashboard", "Employees", "Attendance", "Leave", "Report"];
    const userNavLinks = ["Dashboard", "User Profile", "Attendance", "Leave"];
    const navLinks = this.props.role === 3 ? userNavLinks : adminNavLinks;
    console.log(navLinks);

    return (
      <Box sx={{ bgcolor: 'primary.main', color: 'light.main', height: '100%', minHeight: '100vh' }}>
        <List>
          <ListItem>
            <ListItemText>Welcome {"user"}</ListItemText>
          </ListItem>
          <Divider />
          {navLinks.map((element, index) => {
            return (<ListItem key={index}>
                <ListItemButton onClick={()=>{
                  this.props.history.push(`/${element.toLowerCase().replace(" ","")}`)
                }}>
                  <ListItemIcon>
                    <Dashboard color="light" />
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

const mapStateToProps = (state) => {
  return {...state.root}
}

SideBar = connect(mapStateToProps)(SideBar);