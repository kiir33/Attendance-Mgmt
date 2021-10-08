import { Component } from 'react'
import { connect } from 'react-redux';
import RequestTable from '../../component/Table'
import { approveRequest, getAllRequest, rejectRequest } from '../../features/request/requestSlice';
import Message from '../../component/Message';

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
        console.log(result)
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
        const requestList = this.props.allRequestData;
        const requestFields = ["user_id", "from", "to", "approval_status", "approved_by"]
        console.log(requestList)
        return (
            <div>
                <h1>Leave Requests</h1>
                <Message values={{
                severity: this.state.messageSeverity,
                title: this.state.messageTitle, message: ""
            }}
                display={this.state.messageVisibility} />
                <RequestTable
                    fields={ requestFields }
                    data={requestList}
                    buttons={[
                        {
                            type: "Approve",
                            callback: (id) => {
                                this.dispatch(approveRequest(id))
                                .unwrap()
                                .then((promiseResult)=>{
                                    const [result, error] = promiseResult;
                                    this.promiseHandler(result, error)
                                });
                            }
                        },
                        {
                            type: "Reject",
                            callback:(id)=>{
                                this.dispatch(rejectRequest(id))
                                .unwrap()
                                .then((promiseResult)=>{
                                    const [result, error] = promiseResult;
                                    this.promiseHandler(result, error)
                                });;
                            }
                        }
                    ]} />

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.request }
}

Requests = connect(mapStateToProps)(Requests);

