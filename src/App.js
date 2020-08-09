import React from "react";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";

function App() {
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = "Required";
    } else if (values.firstName.length > 15) {
      errors.firstName = "Must be 15 characters or less";
    }

    if (!values.lastName) {
      errors.lastName = "Required";
    } else if (values.lastName.length > 20) {
      errors.lastName = "Must be 20 characters or less";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
 
    return (
      <>
        {meta.touched && meta.error ? (
          <>
            <label htmlFor={props.id || props.name}>{meta.error}</label>
            <input className="text-input" {...field} {...props} />
          </>
        ) : (
          <>
            {" "}
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
          </>
        )}
      </>
    );
  };

  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(()=>{  alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            resetForm();},1000)
        
        }}
      >{({isSubmitting})=>(  <Form>
        <MyTextInput
          label="First Name"
          name="firstName"
          type="text"
          placeholder="Jane"
        />
        <MyTextInput
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="Doe"
        />
        <MyTextInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="jane@formik.com"
        />
        <button type="submit" disabled={isSubmitting}>Submit</button>
      </Form>)}
      

        {/* 
      {formik=>(

          




      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="firstName">Enter firtsyName</label>
        <input
          type="text"
          id="firstName"
          {...formik.getFieldProps('firstName')}
          // name="firstName"
          // onBlur={formik.handleBlur}
          // onChange={formik.handleChange}
          // value={formik.values.firstName}
          placeholder={formik.errors.firstName || "first name"}
        />
        {formik.touched.firstName&& formik.errors.firstName ? <div> {formik.errors.firstName}</div> : null}
        <label htmlFor="lastName">Enter Last name</label>
        <input
          type="text"
          id="lastName"
          {...formik.getFieldProps('lastName')}
          // name="lastName"
          // onBlur={formik.handleBlur}
          // onChange={formik.handleChange}
          // value={formik.values.lastName}
          placeholder={formik.errors.lastName || "last name"}
        />
        {formik.touched.lastName&& formik.errors.lastName ? <div> {formik.errors.lastName} </div> : null}

        <label htmlFor="email">Enter email</label>
        <input
          type="email"
          id="email"
          {...formik.getFieldProps('email')}
          // name="email"
          // onBlur={formik.handleBlur}
          // onChange={formik.handleChange}
          // value={formik.values.email}
        />
        {formik.touched.email&& formik.errors.email ? <div> invalid email</div> : null}
        <button type="submit">Submit</button>
      </form>)} */}
      </Formik>
    </>
  );
}

export default App;
