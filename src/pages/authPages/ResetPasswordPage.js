import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Container, Paper, Stack, Button, TextField } from '@mui/material';
import { fetchAuth } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import auth from '../../features/auth/auth'
import Header from '../../component/Header';
import { useState } from 'react';
import Message from '../../component/Message';
import { patchPassword } from '../../features/resetPassword/resetPasswordSlice';


const validationSchema = yup.object({
  token: yup
    .string('Enter your token')
    .required('token is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const ResetPasswordPage = (props) => {
  const [messageVisibility, setMessageVisibility] = useState(false);
  const dispatch = useDispatch()
  const state = useSelector(state => state.auth)
  const formik = useFormik({
    initialValues: {
      token: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = { user: values }
      console.log(values)
      dispatch(patchPassword({...values}))
    },
  });


  return (
    <Box sx={{height: "100vh"}}>
      <Header />
      <Message values={{severity: "error", title: "", message: state.errorMessage}} display={messageVisibility ? "block" : "none"} />
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
              <TextField
                margin="normal"
                id="token"
                name="token"
                label="token"
                value={formik.values.token}
                onChange={formik.handleChange}
                error={formik.touched.token && Boolean(formik.errors.token)}
                helperText={formik.touched.token && formik.errors.token}
              />
              <TextField
                margin="normal"
                id="password"
                name="password"
                label="New Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                color="primary"
                variant="contained"
                type="submit"
                margin="normal"
                size="medium"
                sx={{
                  m: "0 auto",
                }}>
                Reset Your Password
              </Button>

            </Stack>
          </form>
        </Paper>
      </Container>
      </Box>
  );
};


export default ResetPasswordPage;