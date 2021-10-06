import { Component } from 'react'
import { Box } from '@mui/material'
import { connect } from 'react-redux'
import CustomPaginationActionsTable from '../../component/Table';
import { fetchAllUsers } from '../../features/allUser/allUserSlice'
import { Route } from 'react-router-dom';


export default class Employees extends Component {
    constructor(props) {
        super(props);
        this.dispatch = this.props.dispatch;
    }

    componentDidMount() {
        this.dispatch(fetchAllUsers())
    }

    render() {
        const employeeList = this.props.data
        const employeeFields = ["id", "name", "email", "gender", "role", "contact"]
        return (
            <Box margin={6}>
                <h1>Employees</h1>
                    <CustomPaginationActionsTable data={employeeList} fields={employeeFields} buttons={["view", "edit", "delete"]} />
            </Box>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.allUser }
}

Employees = connect(mapStateToProps)(Employees);