import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Delete, Edit, RemoveRedEye } from '@mui/icons-material';
import { gradientCollection, theme } from '../utils/theme';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDetail } from '../features/user/userDetailSlice';
import { Button } from '@mui/material';


function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};



export default function CustomPaginationActionsTable(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const rows = props.data;
    const columns = props.fields;
    const buttons = props.buttons;
    const history = useHistory();
    const dispatch = useDispatch();
    const state = useSelector(state => state.userDetail)

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        {columns.map((field, index) => <TableCell key={index} align={index !== 0 ? "right" : "left"}>{field}</TableCell>)}
                        {buttons.map((field, index) => <TableCell key={index} ></TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                    ).map((row, index) => (
                        <TableRow key={index}>
                            {columns.map((field, columnIndex) => <TableCell
                                scope="row"
                                key={columnIndex}
                                align={columnIndex !== 0 ? "right" : "left"}
                                width="auto"
                            >{row[field]}</TableCell>)}
                            {buttons.length > 0 &&
                                buttons.map((button, buttonIndex) => {
                                    return (
                                        <TableCell key={buttonIndex}>
                                            {(button.type === "view") ?
                                                <Link to={{ pathname: button.callback("/users", row.id) }}>
                                                    <IconButton color="light" sx={{
                                                        background: gradientCollection.info.main,
                                                        "&:hover": {
                                                            transform: "scale(1.1)",
                                                        }
                                                    }}>
                                                        <RemoveRedEye />
                                                    </IconButton>
                                                </Link> :
                                                (button.type === "edit") ?
                                                    <IconButton
                                                        color="light"
                                                        sx={{
                                                            background: gradientCollection.warning.main,
                                                            "&:hover": {
                                                                transform: "scale(1.1)",
                                                            }
                                                        }}
                                                        onClick={() => {
                                                            dispatch(fetchUserDetail(row.id))
                                                                .unwrap()
                                                                .then((data) => {
                                                                    const [userData, error] = data
                                                                    history.push(button.callback(`/users/edit`, row.id), { userData: userData.user, method: "patch" })
                                                                }
                                                                );

                                                        }}
                                                    >
                                                        <Edit />
                                                    </IconButton>
                                                    : (button.type === "delete") ?
                                                        <IconButton color="light" sx={{
                                                            background: gradientCollection.danger.main,
                                                            "&:hover": {
                                                                transform: "scale(1.1)",
                                                            }
                                                        }}>
                                                            <Delete />
                                                        </IconButton>
                                                        :
                                                        null
                                            }
                                        </TableCell>
                                    )
                                })}
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={5}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
