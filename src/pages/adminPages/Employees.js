import { Component } from 'react'
import { Box, Button } from '@mui/material'
import { connect } from 'react-redux'
import CustomPaginationActionsTable from '../../component/Table';
import { fetchAllUsers } from '../../features/allUser/allUserSlice'
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import ProtectedRoute from '../../component/ProtectedRoute';
import UserDetail from './UserDetail';
import UserForm from './UserForm';

export default class Employees extends Component {
    constructor(props) {
        super(props);
        this.dispatch = this.props.dispatch;
        this.history = this.props.history;
    }

    componentDidMount() {
        this.dispatch(fetchAllUsers())
    }

    render() {
        const employeeList = this.props.data
        const employeeFields = ["id", "name", "email", "gender", "role", "contact"]
        return (
            <>
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
                            onClick={() => {

                            }}>
                            Add new user
                        </Button>
                    </Link>
                    <CustomPaginationActionsTable
                        data={employeeList}
                        fields={employeeFields}
                        buttons={
                            [{
                                type: "view",
                                callback: (path, id) => {
                                    return `${path}/${id}`
                                }
                            },
                            {
                                type: "edit", callback: (path, id) => {
                                    return `${path}/${id}`
                                }
                            },
                            {
                                type: "delete", callback: (path, id) => { }
                            }]
                        }
                    />
                </Box>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.allUser }
}

Employees = connect(mapStateToProps)(Employees);