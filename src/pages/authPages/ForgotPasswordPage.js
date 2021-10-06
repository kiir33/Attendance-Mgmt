import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Container, Paper, Stack, Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../component/Header';
import { useState } from 'react';
import Message from '../../component/Message';
import { postEmail } from '../../features/resetPassword/resetPasswordSlice';
import { useHistory } from 'react-router';


const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
});

const ForgotPasswordPage = (props) => {
    const [messageVisibility, setMessageVisibility] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector(state => state.auth);
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(postEmail({...values}))
        },
    });


    return (
        <Box sx={{ height: "100vh" }}>
            <Header />
            <Message values={{ severity: "error", title: "", message: state.errorMessage }} display={messageVisibility ? "block" : "none"} />
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
                            <Typography variant="body1">
                                Please Enter your email to search your account.
                            </Typography>
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

                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                margin="normal"
                                size="medium"
                                sx={{
                                    m: "0 auto",
                                }}
                                >
                                Continue
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};


export default ForgotPasswordPage;