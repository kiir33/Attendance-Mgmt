import { Component } from 'react'
import { connect } from 'react-redux';
import { setRole } from '../../features/rootSlice';
import { getCookie } from '../../utils/cookies';

export default class Dashboard extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <h1>AdminDashBoard</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state }
}

Dashboard = connect(mapStateToProps)(Dashboard);