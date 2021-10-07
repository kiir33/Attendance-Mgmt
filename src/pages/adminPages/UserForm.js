import { useFormik } from 'formik';
import * as yup from 'yup';
import { Container, Paper, Stack, Button, TextField, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { useDispatch, } from 'react-redux';
import { postNewUser, updateExistingUser } from '../../features/user/userDetailSlice';
import { useHistory, } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { KeyboardReturn } from '@mui/icons-material';
import Message from '../../component/Message';
import { useState } from 'react';



const validationSchemaPost = yup.object({
    name: yup
        .string('Enter name')
        .required('Name is required'),
    email: yup
        .string('Enter email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    gender: yup
        .number('Select Gender')
        .required('Gender is required'),
    role: yup
        .number('Select Role')
        .required('Role is required'),
    contact: yup
        .string('Enter Contact')
        .required('Contact cannot be black')
});
const validationSchemaPatch = yup.object({
    name: yup
        .string('Enter name')
        .required('Name is required'),
    email: yup
        .string('Enter email')
        .email('Enter a valid email')
        .required('Email is required'),
    gender: yup
        .number('Select Gender')
        .required('Gender is required'),
    role: yup
        .number('Select Role')
        .required('Role is required'),
    contact: yup
        .string('Enter Contact')
        .required('Contact cannot be black')
});

//add method props when calling UserForm
//add existing user to props when method === patch

const UserForm = (props) => {
    const dispatch = useDispatch();
    const { method, userId } = props.location.state
    const [message, setMessage] = useState("");
    const [messageVisibility, setMessageVisibility] = useState(false);
    const [messageSeverity, setMessageSeverity] = useState("info");
    const history = useHistory();


    const existingUser = history.location.state.userData
    const initialValues = (existingUser) ? {
        ...existingUser,
        gender: existingUser.gender.toString(),
        role: existingUser.role.toString()
    } : {
        name: '',
        email: '',
        password: '',
        gender: '',
        role: '',
        contact: '',
        salary: '',
    };


    const formik = useFormik({
        initialValues,
        validationSchema: method==="post"? validationSchemaPost: validationSchemaPatch,
        onSubmit: (values) => {
            const payload = {
                user: {
                    ...values,
                    gender: parseInt(values.gender),
                    role: parseInt(values.role),
                    salary: parseFloat(values.salary)
                }
            };
            if (method === "post") {
                dispatch(postNewUser(payload))
                    .unwrap()
                    .then(promiseResult => {
                        const [result, error] = promiseResult
                        if (!error) {
                            setMessage("user successfully created")
                            setMessageVisibility(true);
                            setMessageSeverity("info");
                        } else {
                            setMessage(error.message);
                            setMessageVisibility(true);
                            setMessageSeverity("warning");
                        }
                        setTimeout(() => {
                            setMessage("");
                            setMessageVisibility(false);
                            setMessageSeverity("info");
                        }, 5000)
                    })
            } else {
                dispatch(updateExistingUser(payload, userId))
            }

        },
    });
    return (
        <>
            <IconButton onClick={() => history.push('/employees')}>
                <KeyboardReturn />
            </IconButton>
            <Message values={{ severity: messageSeverity, title: message, message: "" }} display={messageVisibility ? "block" : "none"} />
            <Container
                maxWidth="xs"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItem: "center",
                    mt: 10
                }}>
                <Paper elevation={2} sx={{ p: 5 }}>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack direction="column" spacing={3} alignItems="center">
                            <FormControl>
                                <TextField
                                    margin="normal"
                                    id="name"
                                    name="name"
                                    label="Name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </FormControl>

                            <FormControl>
                                <TextField
                                    margin="normal"
                                    id="email"
                                    name="email"
                                    label="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </FormControl>
                            {method === "post" &&
                                <FormControl>
                                    <TextField
                                        margin="normal"
                                        id="password"
                                        name="password"
                                        label="Password"
                                        type="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                    />
                                </FormControl>
                            }
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup
                                    aria-label="gender"
                                    name="gender"
                                    value={formik.values.gender}
                                    onChange={formik.handleChange}
                                >
                                    <FormControlLabel value="1" control={<Radio />} label="Male" />
                                    <FormControlLabel value="2" control={<Radio />} label="Female" />
                                </RadioGroup>
                            </FormControl>

                            <FormControl component="fieldset">
                                <FormLabel component="legend">Role</FormLabel>
                                <RadioGroup
                                    aria-label="role"
                                    name="role"
                                    value={formik.values.role}
                                    onChange={formik.handleChange}
                                >
                                    <FormControlLabel value="2" control={<Radio />} label="Admin" />
                                    <FormControlLabel value="3" control={<Radio />} label="User" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <TextField
                                    margin="normal"
                                    id="contact"
                                    name="contact"
                                    label="Contact"
                                    value={formik.values.contact}
                                    onChange={formik.handleChange}
                                    error={formik.touched.contact && Boolean(formik.errors.contact)}
                                    helperText={formik.touched.contact && formik.errors.contact}
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    margin="normal"
                                    id="salary"
                                    name="salary"
                                    label="Salary"
                                    type="number"
                                    value={formik.values.salary}
                                    onChange={formik.handleChange}
                                    error={formik.touched.salary && Boolean(formik.errors.salary)}
                                    helperText={formik.touched.salary && formik.errors.salary}
                                />
                            </FormControl>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                margin="normal"
                                size="medium"
                                sx={{
                                    m: "0 auto",
                                    maxWidth: "6px"
                                }}>
                                Add User
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </>
    );
};


export default UserForm;
