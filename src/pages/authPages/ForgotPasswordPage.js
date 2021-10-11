import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Container, Paper, Stack, Button, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import Header from '../../component/Header';
import { useState } from 'react';
import Message from '../../component/Message';
import { postEmail } from '../../features/resetPassword/resetPasswordSlice';


const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
});

const ForgotPasswordPage = (props) => {
    const [messageVisibility, setMessageVisibility] = useState(false);
    const [message, setMessage] = useState("");
    const [messageSeverity, setMessageSeverity] = useState("info");
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(postEmail({...values}))
            .unwrap()
            .then(promiseResult => {
                const [result, error] = promiseResult;
                if(!error){
                    setMessage(result.message)
                    setMessageVisibility(true);
                    props.history.push('/resetPassword')
                }else{
                    setMessageSeverity("error")
                    setMessage(error.message)
                    setMessageVisibility(true);
                }
                setTimeout(()=> {
                    setMessageSeverity("info");
                    setMessageVisibility(false);
                    setMessage("");
                }, 5000)
            })
        },
    });


    return (
        <Box sx={{ height: "100vh" }}>
            <Header />
            <Message values={{ severity: messageSeverity, title: "", message: message }} display={messageVisibility ? "flex" : "none"} />
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