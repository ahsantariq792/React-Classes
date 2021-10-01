import './App.css';
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from "@mui/material/Button";
import { TextField } from '@mui/material';


const submit = (values) => {
  console.log("values", values)
}




const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  name: yup
    .string('Enter your password')
    .min(4, 'Name should be of minimum 8 characters length')
    .required('Name is required'),
});







function App() {

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      email: '',
      password: '',
      name: ''
    },
    onSubmit: submit
  },
  );


  return (
    <>
      <div className="main">
        <form onSubmit={formik.handleSubmit}>

          <TextField
            id="outlined-basic"
            name="email"
            label="email"
            className="box"
            value={formik.values.email}
            onChange={formik.handleChange}

            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}


            variant="outlined" />



          <TextField
            id="outlined-basic"
            name="password"
            label="password"
            type="password"
            className="box"

            value={formik.values.password}
            onChange={formik.handleChange}


            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}

            variant="outlined" />


          <TextField
            id="outlined-basic"
            name="name"
            label="name"
            className="box"

            value={formik.values.name}
            onChange={formik.handleChange}


            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}

            variant="outlined" />


          <Button id="btn" variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}

export default App;

