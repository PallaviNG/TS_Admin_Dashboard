import React from "react";
import circular_logo from "../Images/circular_logo.jpg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { saveAdminRegister } from "./../../Service/adminService";
import InputError from './../InputError';

function AdminRegister({ history }) {
    let initialValues = {
        admin_name: "",
        admin_email: "",
        admin_role: "",
        admin_password: "",
    };

    let roles = [
        { name: '-select role-', value: '' },
        { name: 'admin', value: 'admin' },
        { name: 'trainer', value: 'trainer' },
        { name: 'student', value: 'student' }];

    let validationSchema = yup.object().shape({
        admin_name: yup.string().min(4, "username must be more than 4 characters").max(30, "admin username must be less than 30 characters").required("username is required"),
        admin_password: yup.string().required("password is required"),
        admin_email: yup.string().required("Email ID is required"),
        admin_role: yup.string().required("Select role")
    });

    let onSubmit = (values, onSubmitProps) => {
        console.log(values);
        saveAdminRegister("add-new-admin-user", values).then((result) => {
            if (result === undefined) return false;
            history.push("/admin-login");
        });
    };

    return (
        <div className="parentContainer  flex flex-direction-column">
            <div className="loginContainer">
                <div className="loginHeader flex align-items-center justify-content-space-around">
                    <img src={circular_logo} alt="logo" />
                    <h2> Admin Panel Register</h2>
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
                                        autoComplete="off"
                                        placeholder="User Name"
                                    />
                                </div>
                                <ErrorMessage name="admin_name" className="error" component={InputError} />
                            </div>
                            <div className=" flex flex-direction-column justify-content-center align-items-center">
                                <div className="login-form-group flex justify-content-center align-items-center">
                                    <span className="flex justify-content-center align-items-center">
                                        <i className="fa fa-envelope" aria-hidden="true"></i>
                                    </span>
                                    <Field
                                        name="admin_email"
                                        id="admin_email"
                                        type="email"
                                        autoComplete="off"
                                        placeholder="Email ID"
                                        className="text-transform-lowercase"
                                    />
                                </div>
                                <ErrorMessage name="admin_email" className="error" component={InputError} />
                            </div>
                            <div className=" flex flex-direction-column justify-content-center align-items-center">
                                <div className="login-form-group flex justify-content-center align-items-center">
                                    <span className="flex justify-content-center align-items-center">
                                        <i className="fa fa-id-card" aria-hidden="true"></i>
                                    </span>
                                    <Field name="admin_role" as="select" >
                                        {
                                            roles.map((role, index) =>
                                                <option key={index} value={role.value}>{role.name}</option>)
                                        }
                                    </Field>
                                </div>
                                <ErrorMessage name="admin_role" className="error" component={InputError} />
                            </div>
                            <div className=" flex flex-direction-column justify-content-center align-items-center">
                                <div className="login-form-group flex justify-content-center align-items-center">
                                    <span className="flex  justify-content-center align-items-center">
                                        <i className="fa fa-key" aria-hidden="true"></i>
                                    </span>
                                    <Field
                                        name="admin_password"
                                        type="password"
                                        id="admin_password"
                                        autoComplete="off"
                                        placeholder="Password"
                                    />
                                </div>
                                <ErrorMessage name="admin_password" className="error" component={InputError} />
                            </div>
                            <div className="loginButton flex justify-content-space-around align-items-center">
                                <button type="submit" className="flex align-items-center">Register</button>
                                <button className="flex align-items-center" onClick={() => { history.push("/admin-login") }}>Login</button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default AdminRegister;