import { Formik } from "formik";
import * as Yup from "yup";
//import useContextGetter from "../hooks/useContextGetter";
//import { useState } from "react";
import InputField from "../components/form-input/InputField";
import Button from "../components/form-input/Button";
import AppForm from "../components/form/AppForm";
import { Spinner } from "react-bootstrap";
import API from "../utils/BackendApi";
import { formatErrors } from "../utils/error.utils";
import { Link, useHistory } from "react-router-dom";

// const initial_state = {
//   user: {
//     email: ""
//   }
// }
export const SignUp = () => {
  //const [state, setState] = useState(initial_state);
  const history = useHistory();
  const validate = Yup.object().shape({
    email: Yup.string()
      .email(" Please enter a valid email address ")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Please provide a strong password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Please confirm your password"),
  });

  // const setStateValue = (field, value) => {
  //   setState(prevState => ({
  //     ...prevState,
  //     [field]: value
  //   }))
  // }


  const handleSignup = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await API.post(`/signup`, values);
      if (res.status===201) {
        alert("Signup successful")
        setTimeout(() => { history.replace("/login") }, 3000)
      }
    } catch (e) {
      alert(formatErrors(e))
    } finally {
      window.scrollTo(0, 0);
      setSubmitting(false);
    }
  };

  return (
    <div>
      <AppForm>
        <h1 className="text-white p-2"> Sign Up </h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validate}
          onSubmit={handleSignup}
        >
          {({ handleSubmit, isSubmitting }) => (
            <div><form onSubmit={handleSubmit}>
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Email"
              />
              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Password"
              />

              <InputField
                label="Confirm password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
              />
            <div>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {!isSubmitting ? (
                  "Submit"
                ) : (
                  <Spinner animation="border" variant="light" />
                )}
              </Button>
              </div>
            </form>
              <p className='text-sm text-white p-2'>
                Have an account?{" "}
                <span>
                  <Link to="/login"> Login </Link>
                </span>
              </p>
            </div>
          )}
        </Formik>
      </AppForm>
    </div>
  );
};

export default SignUp;