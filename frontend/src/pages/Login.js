import { Formik } from "formik";
import * as Yup from "yup";
import useContextGetter from "../hooks/useContextGetter";
//import { useState } from "react";
import InputField from "../components/form-input/InputField";
import Button from "../components/form-input/Button";
import AppForm from "../components/form/AppForm";
import { Spinner } from "react-bootstrap";
import API from "../utils/BackendApi";
import { formatErrors } from "../utils/error.utils";
import { Link, useHistory } from "react-router-dom";

export const Login = () => {
    const { login } = useContextGetter();
  //const [state, setState] = useState(initial_state);
  const history = useHistory();
  const validate = Yup.object().shape({
    email: Yup.string()
      .email(" Please enter a valid email address ")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Please provide a strong password"),
  });

  // const setStateValue = (field, value) => {
  //   setState(prevState => ({
  //     ...prevState,
  //     [field]: value
  //   }))
  // }


  const handleLogin= async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await API.post(`/login`, values);
      if (res.status===202) {
        login(res.data.data);
        alert("Login successful");
        setTimeout(() => { history.replace("/dashboard") }, 3000)
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
        <h1 className="text-white p-2"> Login </h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validate}
          onSubmit={handleLogin}
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
            <div>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {!isSubmitting ? (
                  "Login"
                ) : (
                  <Spinner animation="border" variant="light" />
                )}
              </Button>
              </div>
            </form>
              <p className='text-sm text-white p-2'>
                Don't have an account?{" "}
                <span>
                  <Link to="/signup"> SignUp </Link>
                </span>
              </p>
            </div>
          )}
        </Formik>
      </AppForm>
    </div>
  );
};

export default Login;