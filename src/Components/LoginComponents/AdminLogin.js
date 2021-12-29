import React, { useState, useEffect } from "react";
import circular_logo from "../Images/circular_logo.jpg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import {
  getAdminUsersList,
  getAdminLogin,
  saveAuthToken,
} from "./../../Service/adminService";
import InputError from "./../InputError";
import { toast } from "react-toastify";

export default function AdminLogin({ history }) {
  let initialValues = {
    admin_name: "",
    admin_password: "",
    admin_role: "",
  };

  let roles = [
    { name: "-select role-", value: "" },
    { name: "admin", value: "admin" },
    { name: "trainer", value: "trainer" },
    { name: "student", value: "student" },
    { name: "interviewer", value: "interviewer" },
  ];

  const [visible, setVisibility] = useState(false);

  // const [loginVisible, setLoginVisible] = useState(false);

  let [failedAttempts, setFailedAttempts] = useState(0);

  let [adminUsers, setAdminUsers] = useState([]);

  let validationSchema = yup.object().shape({
    admin_name: yup
      .string()
      .min(4, "username must be more than 4 characters")
      .max(30, "admin username must be less than 30 characters")
      .required("username is required"),
    admin_password: yup.string().required("password is required"),
    admin_role: yup.string().required("Select role"),
  });

  let onSubmit = (values) => {
    getAdminLogin("check-admin-login", values).then((result) => {
      if (result === undefined) return false;
      saveAuthToken(result.headers.x_auth_token);
    });
  };

  useEffect(() => {
    getAdminUsersList("get-admin-users-list").then((result) => {
      if (result === undefined) return false;
      // console.log(result.data.adminList.length);

      if (result.data.adminList.length === 0)
        toast.info("Admin User list is empty, Please Sign up!");
      // if (result.data.adminList.length !== 0) {
      else {
        adminUsers = result.data.adminList;
        setAdminUsers([...adminUsers]);
      }
    });
  }, []);

  return (
    <div className="parentContainer  flex flex-direction-column">
      <div className="loginContainer">
        <div className="loginHeader flex align-items-center justify-content-space-around">
          <img src={circular_logo} alt="logo" />
          <h2> Admin Panel Login</h2>
        </div>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          <Form>
            <div className="loginBody">
              <div className=" flex flex-direction-column justify-content-center align-items-center">
                <div className="login-form-group flex justify-content-center align-items-center">
                  <span className="flex justify-content-center align-items-center">
                    <i className="fa fa-user" aria-hidden="true"></i>
                  </span>
                  <Field
                    name="admin_name"
                    id="admin_name"
                    placeholder="User Name"
                    autoComplete="off"
                    autoFocus
                  />
                </div>
                <ErrorMessage
                  name="admin_name"
                  className="error"
                  component={InputError}
                />
              </div>

              <div className=" flex flex-direction-column justify-content-center align-items-center">
                <div className="login-form-group passwordContainer flex justify-content-center align-items-center">
                  <span className="flex  justify-content-center align-items-center">
                    <i className="fa fa-key" aria-hidden="true"></i>
                  </span>

                  {visible ? (
                    <>
                      <Field
                        name="admin_password"
                        id="admin_password"
                        type="text"
                        autoComplete="off"
                        placeholder="Password"
                      />
                      <strong
                        className="passwordIcon"
                        onClick={() => setVisibility(false)}
                      >
                        <i className="fa fa-eye" aria-hidden="true"></i>
                      </strong>
                    </>
                  ) : (
                    <>
                      <Field
                        name="admin_password"
                        id="admin_password"
                        type="password"
                        autoComplete="off"
                        placeholder="Password"
                      />
                      <strong
                        className="passwordIcon"
                        onClick={() => setVisibility(true)}
                      >
                        <i className="fa fa-eye-slash" aria-hidden="true"></i>
                      </strong>
                    </>
                  )}
                </div>
                <ErrorMessage
                  name="admin_password"
                  className="error"
                  component={InputError}
                />
              </div>
              <div className=" flex flex-direction-column justify-content-center align-items-center">
                <div className="login-form-group flex justify-content-center align-items-center">
                  <span className="flex justify-content-center align-items-center">
                    <i className="fa fa-id-card" aria-hidden="true"></i>
                  </span>
                  <Field name="admin_role" as="select">
                    {roles.map((role, index) => (
                      <option key={index} value={role.value}>
                        {role.name}
                      </option>
                    ))}
                  </Field>
                </div>
                <ErrorMessage
                  name="admin_role"
                  className="error"
                  component={InputError}
                />
              </div>
              <div className="loginButton flex justify-content-space-around align-items-center">
                <button
                  onClick={() => {
                    history.push("/admin/register");
                  }}
                >
                  Sign Up
                </button>
                <button className="flex align-items-center">Login</button>

                {/* {adminUsers.length === 0 ? 
                (setLoginVisible(false);
                  <button className="flex align-items-center" disabled>Login</button>)
                  :(
                    setLoginVisible(true);
                <button className="flex align-items-center">Login</button>
                )} */}
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
