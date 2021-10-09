import { Component } from 'react'
import { Box, Button } from '@mui/material'
import { connect } from 'react-redux'
import CustomPaginationActionsTable from '../../component/Table';
import { fetchAllUsers } from '../../features/allUser/allUserSlice'
import { Link } from 'react-router-dom';
import { fetchUserDetail, deleteUser } from '../../features/user/userDetailSlice';
import Message from '../../component/Message';


export default class Employees extends Component {
    constructor(props) {
        super(props);
        this.dispatch = this.props.dispatch;
        this.history = this.props.history;
        this.state = {
            messageSeverity: "info",
            messageTitle: "",
            messageVisibility: "none"
        }
    }

    componentDidMount() {
        this.dispatch(fetchAllUsers())
    }

    promiseHandler(error) {
        if (error === null) {
            this.setState({
                messageTitle: "User Succesfully Deleted",
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
        const employeeList = this.props.data
        const employeeFields = ["id", "name", "email", "gender", "role", "contact"]
        return (
            <Box margin={6}>
                <Message values={{
                    title: this.state.messageTitle,
                    severity: this.state.messageSeverity
                }} display={this.state.messageVisibility} />
                <Box margin={6}>
                    <Link
                        to={{
                            pathname: `newUser`,
                            state: {
                                method: "post",
                                from: this.props.location.path
                            }
                        }}
                        style={{ textDecoration: "none" }}>
                        <Button
                            variant="contained"
                        >
                            Add new user
                        </Button>
                    </Link>
                    <CustomPaginationActionsTable
                        data={employeeList}
                        fields={employeeFields}
                        buttons={
                            [{
                                type: "view",
                                callback: (id) => {
                                    this.history.push(`/users/${id}`);
                                }
                            },
                            {
                                type: "edit", callback: (id) => {
                                    this.dispatch(fetchUserDetail(id))
                                        .unwrap()
                                        .then((data) => {
                                            const [userData, error] = data;
                                            this.history.push(`/users/edit/${id}`,
                                                {
                                                    userData: userData.user,
                                                    method: "patch"
                                                }
                                            )
                                        });
                                }
                            },
                            {
                                type: "delete", callback: (id) => {
                                    this.dispatch(deleteUser(id))
                                        .unwrap()
                                        .then(promiseResult => {
                                            const [result, error] = promiseResult;
                                            this.promiseHandler(error);
                                            this.dispatch(fetchAllUsers());
                                        })
                                }
                            }]
                        }
                    />
                </Box>
            </Box>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.allUser }
}

Employees = connect(mapStateToProps)(Employees);