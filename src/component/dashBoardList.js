import React, { Component } from 'react'

export default class dashBoardList extends Component {
    render() {
        const {pathname, title} = this.props.value;
        return (
            <Paper>
                <Link
                    to={{
                        pathname: "/requests"
                    }}
                    style={{
                        textDecoration: "none",
                    }}>

                    <List
                        sx={{
                            minHeight: "200px",
                            minWidth: "200px"
                        }}
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Pending Request
                            </ListSubheader>
                        }>
                        {this.filterByPendingRequest(this.props.request.allRequestData).map((item, index) => {
                            return (
                                <ListItem key={index}>
                                    <ListItemText>
                                        <Typography variant="body2">
                                            {item.user_id + " > " + this.props.allUser.mapIdToName[item.user_id]}
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                            )
                        })}
                    </List>
                </Link>
            </Paper>
        )
    }
}
