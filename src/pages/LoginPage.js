import { useFormik } from 'formik';
import * as yup from 'yup';
import { Container, Paper, Stack, Button, TextField, Typography } from '@mui/material';
import { fetchAuth } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import auth from '../app/auth'


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
  const dispatch = useDispatch()
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
          console.log(promiseResult)
          const [result, error] = promiseResult;
          if (error) {
            console.log(error);
          } else {
            const token = result.attributes.auth_token;
            auth.login(token, () => {
              console.log("hello")
              props.history.push('/');
            })
          }
        })
    },
  });


  return (
    <>
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
                }}>
                Forgot your password?
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
};


export default LoginPage;