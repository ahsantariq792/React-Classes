import { addDoc, collection, getDocs, query, onSnapshot } from "firebase/firestore";
import './App.css';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from "@mui/material/Button";
import { TextField } from '@mui/material';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"





//Details of API
const firebaseConfig = {
  apiKey: "AIzaSyAnh9RsP1lueXVDFgdWykikcAmxkEO5Gag",
  authDomain: "react-class-tasks.firebaseapp.com",
  projectId: "react-class-tasks",
  storageBucket: "react-class-tasks.appspot.com",
  messagingSenderId: "79676877882",
  appId: "1:79676877882:web:af3556939e02a7bddb5903",
  measurementId: "G-92D2CE3N46"
};

// Initialize Firebase
initializeApp(firebaseConfig);

//Handler For API
const db = getFirestore();



//onsubmit function
async function submit(values) {
  console.log("values", values)

  try {
    const docRef = await addDoc(collection(db, "users"), {
      email: values.email,
      password: values.password,
      name: values.name
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


//validation schema 
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

  const [Data, setData] = useState([])

  useEffect(() => {

    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      let details = []
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        details.push(doc.data())

      });

      setData(details)
    }

    getData()
  }, [])



  //getting data in object
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

      <div>
        <h6>Details </h6>
        {Data.map((eachUser, i) => {

          return (<div key={i}>
            <div> name: {eachUser.name}</div>
            <div>email : {eachUser.email}</div>
            <div> password: {eachUser.password}</div>
            <br />
          </div>)
        })}

      </div>
    </>
  );
}

export default App;

