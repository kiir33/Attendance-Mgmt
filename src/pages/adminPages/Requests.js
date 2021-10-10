import { Component } from 'react'
import { connect } from 'react-redux';
import RequestTable from '../../component/Table'
import { approveRequest, getAllRequest, rejectRequest } from '../../features/request/requestSlice';
import Message from '../../component/Message';
import {Box} from '@mui/material'

export default class Requests extends Component {
    constructor(props) {
        super(props);
        this.dispatch = this.props.dispatch;
        this.history = this.props.history;
        this.state = {
            messageTitle: "",
            messageSeverity: "info",
            messageVisibility: "none",
        }
    }

    componentDidMount() {
        this.dispatch(getAllRequest());
    }

    promiseHandler(result, error) {
        if (!error) {
            this.setState({
                messageTitle: "Attendance Successfully Recorded",
                messageSeverity: "success",
                messageVisibility: "block",
            })

        } else {
            this.setState({
                messageTitle: error.data.message,
                messageSeverity: "warning",
                messageVisibility: "block",
            })

        }
        setTimeout(() => {
            this.setState({
                messageTitle: "",
                messageSeverity: "info",
                messageVisibility: "none",
            })
        }, 5000)
    }


    render() {
        let requestList = this.props.allRequestData.map(elem => {
            return {
                ...elem,
                user_id: this.props.allUser.mapIdToName[elem.user_id]
            }
        });

        const requestFields = ["user_id", "from", "to", "approval_status", "approved_by"]
        return (
            <Box m={2}>
                <h1>Leave Requests</h1>
                <Message values={{
                    severity: this.state.messageSeverity,
                    title: this.state.messageTitle, message: ""
                }}
                    display={this.state.messageVisibility} />
                <RequestTable
                    fields={requestFields}
                    data={requestList}
                    buttons={[
                        {
                            type: "view",
                            callback: (id) => {
                                this.history.push(`/requests/${id}`)
                            }
                        },
                        {
                            type: "Approve",
                            callback: (id) => {
                                this.dispatch(approveRequest(id))
                                    .unwrap()
                                    .then((promiseResult) => {
                                        const [result, error] = promiseResult;
                                        this.promiseHandler(result, error)
                                    });
                            }
                        },
                        {
                            type: "Reject",
                            callback: (id) => {
                                this.dispatch(rejectRequest(id))
                                    .unwrap()
                                    .then((promiseResult) => {
                                        const [result, error] = promiseResult;
                                        this.promiseHandler(result, error)
                                    });;
                            }
                        }
                    ]} />

            </Box>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.request, allUser:state.allUser }
}

Requests = connect(mapStateToProps)(Requests);

