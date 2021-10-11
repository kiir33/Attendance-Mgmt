import { Box, Typography, Divider, Paper } from '@mui/material'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getRequest } from '../../features/request/requestSlice';

export default class RequestView extends Component {

    constructor(props){
        super(props);
        this.requestId = this.props.match.params.id;
    }

    componentDidMount(){
        this.props.dispatch(getRequest(this.requestId));
    }

    render() {
        const requestDetail = this.props.request.requestResult ;
        return (
            <Box sx={{
                p:3,
                lineHeight: "20px",
                maxWidth: "30vw",
            }}>
                <Paper elevation={2}
                sx={{padding: 4}}>
                <Typography variant="h6">
                    ID: {requestDetail.id} <br />
                </Typography>
                <Divider /><br/>
                <Typography variant="body1">
                    From: {requestDetail.from} <br />
                    To: {requestDetail.to} <br />
                    Reson: {requestDetail.remarks}
                </Typography>
                <Divider /><br/>
                <Typography variant="body2">
                    Approval Status: {requestDetail.approval_status ? requestDetail.approval_status : "Pending"}<br />
                    Approved By: {requestDetail.approved_by ? "Super Admin" : "---"}
                </Typography>
                </Paper>
            </Box>
        )
    }
}

const mapStateToProps = (state) => {
    return {request: state.request};
}

RequestView = connect(mapStateToProps)(RequestView);