import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Container, Paper, Stack, Button, TextField } from '@mui/material';
import { fetchAuth } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import auth from '../../features/auth/auth'
import Header from '../../component/Header';
import { useState } from 'react';
import Message from '../../component/Message';
import { setState } from '../../features/rootSlice';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const LoginPage = (props) => {
  const [messageVisibility, setMessageVisibility] = useState(false);
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = { user: values }
      dispatch(fetchAuth(payload))
        .unwrap()
        .then((promiseResult) => {
          const [result, error] = promiseResult;
          if (error) {
            setMessageVisibility(true);
          } else {
            dispatch(setState(result.attributes));
            auth.login({...result.attributes, id:result.id}, () => {
              props.history.push('/');
            })
          }
        })
    },
  });

  auth.isAuthenticated() && (props.history.push('/'))

  return (
    <Box sx={{ height: "100vh" }}>
      <Header />
      <Message values={{ severity: "error", title: "", message: state.auth.errorMessage }} display={messageVisibility ? "flex" : "none"} />
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
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
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
                Login
              </Button>
                <Button
                  variant="text"
                  sx={{
                    m: "0 auto"
                  }}
                  href="/forgot-password">
                  Forgot your password?
                </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};


export default LoginPage;

