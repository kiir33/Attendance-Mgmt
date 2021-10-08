import { Component } from 'react'
import CustomPaginationActionsTable from '../../component/Table'
import { getMyRequest, getRequest } from '../../features/request/requestSlice'
import { connect } from 'react-redux';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default class Request extends Component {
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
        this.dispatch(getMyRequest())
    }

    render() {
        const requestList = this.props.myRequestData;
        const requestFields = ["from", "to", "approval_status"]
        return (
            <div>
                <h1>User Leave Requests</h1>
                <CustomPaginationActionsTable
                    data={requestList}
                    fields={requestFields}
                    buttons={[
                        {
                            type: "view",
                            callback: (id) => {
                                this.history.push("/requests/" + id)
                            }
                        },
                        {
                            type: "edit",
                            callback: (id) => {
                                this.dispatch(getRequest(id))
                                    .unwrap()
                                    .then((promiseResult) => {
                                        const [requestData, error] = promiseResult;
                                        this.history.push(`/editRequest/${id}`,
                                            {
                                                requestData: requestData.data,
                                                method: "patch",
                                            }
                                        )
                                    });
                            }
                        },
                    ]
                    }
                />
                <Link
                    to={{
                        pathname: "/newRequest",
                        state: {
                            method: "post",
                            from: this.props.location.path,
                        }
                    }}
                    style={{ textDecoration: "none" }}
                >
                    <Button
                        variant="contained"
                    >
                        Apply For Leave
                    </Button>
                </Link>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return { ...state.request }
}

Request = connect(mapStateToProps)(Request);

