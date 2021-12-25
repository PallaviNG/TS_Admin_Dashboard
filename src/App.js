import "./App.css";
import "./css/main.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-toastify/dist/ReactToastify.css";

import { Route, Switch, Redirect } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import Navbar from "./Components/IndexPages/Navbar";
import Sidebar from "./Components/IndexPages/Sidebar";
import ContentArea from "./Components/IndexPages/ContentArea";
import PageNotFound from "./Components/404";
import Overview from "./Components/IndexPages/Overview";
import AdminLogin from "./Components/LoginComponents/AdminLogin";
import { getUserDetails } from "./Service/adminService";
import AdminLogout from "./Components/LoginComponents/AdminLogout";
import BatchList from './Components/IndexPages/batch/BatchList';
import EditBatch from './Components/IndexPages/batch/EditBatch';
import NewBatch from './Components/IndexPages/batch/NewBatch';
import TrainerList from "./Components/IndexPages/Trainers/TrainerList";
import AdminRegister from "./Components/LoginComponents/AdminRegister";
import NewTrainer from './Components/IndexPages/Trainers/NewTrainer';
import EditTrainer from './Components/IndexPages/Trainers/EditTrainer';
import ListStudents from './Components/MockInterviewComponents/ListStudents';
import AddMockStudent from './Components/MockInterviewComponents/AddMockStudent';
import PreviewTemplate from './Components/MockInterviewComponents/PreviewTemplate';
import NewCourse from './Components/IndexPages/Course/NewCourse';
import EditCourse from './Components/IndexPages/Course/EditCourse';
import CourseList from './Components/IndexPages/Course/CourseList';
import TemplateDetail from "./Components/MockInterviewComponents/TemplateDetail";
import CreateTemplate from './Components/MockInterviewComponents/CreateTemplate';
import TemplateList from './Components/MockInterviewComponents/TemplateList';
import NewInterviewer from './Components/MockInterviewComponents/NewInterviewer';
import InterviewerList from './Components/MockInterviewComponents/InterviewerList';
import TemplateAssignment from './Components/MockInterviewComponents/TemplateAssignment';
import InterviewerDetail from "./Components/MockInterviewComponents/InterviewerDetail";


function App() {
  let userDetails = getUserDetails();

  return (
    <>
      <ToastContainer />
      {/* {userDetails=== null <Redirect to="/admin/register" /> } */}
      {userDetails ? <Navbar user={userDetails} /> : null}

      {userDetails ? <Sidebar /> : null}

      {/* LOGIN-LOGOUT */}
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => {
            if (userDetails)
              return <ContentArea user={userDetails} {...props} />;
            else return <Redirect to="/admin-login" />;
          }}
        />

        <Route path="/logout" exact render={(props) => {
          if (userDetails)
            return <AdminLogout user={userDetails} {...props} />
          else return <Redirect to="/admin-login" />;
        }} />

        <Route
          path="/overview"
          exact
          render={(props) => {
            if (userDetails) return <Overview {...props} />;
            else return <Redirect to="/admin-login" />;
          }}
        />

        {/* MOCK PANEL */}
        <Route
          path="/mock/template/list"
          exact
          render={(props) => {
            if (userDetails) return <TemplateList {...props} />;
            else return <Redirect to="/admin-login" />;
          }}
        />


        <Route
          path="/mock/template/preview"
          exact
          render={(props) => {
            if (userDetails) return <PreviewTemplate {...props} user={userDetails} />;
            else return <Redirect to="/admin-login" />;
          }}
        />

        <Route
          path="/mock/single/template/detail/:id"
          exact
          render={(props) => {
            if (userDetails) return <TemplateDetail {...props} />;
            else return <Redirect to="/admin-login" />;
          }}
        />

        <Route
          path="/mock/template/new"
          exact
          render={(props) => {
            if (userDetails) return <CreateTemplate {...props} />;
            else return <Redirect to="/admin-login" />;
          }}
        />

        <Route
          path="/mock/template/interviewer/assignment/:id"
          exact
          render={(props) => {
            if (userDetails) return <TemplateAssignment {...props} />;
            else return <Redirect to="/admin-login" />;
          }}
        />

        <Route
          path="/mock/template/interviewer/new"
          exact
          render={(props) => {
            if (userDetails) return <NewInterviewer {...props} />;
            else return <Redirect to="/admin-login" />;
          }}
        />

        <Route
          path="/mock/template/interviewer/detail/:id"
          exact
          render={(props) => {
            if (userDetails) return <InterviewerDetail {...props} />;
            else return <Redirect to="/admin-login" />;
          }}
        />


        <Route
          path="/mock/template/interviewer/list"
          exact
          render={(props) => {
            if (userDetails) return <InterviewerList {...props} />;
            else return <Redirect to="/admin-login" />;
          }}
        />


        <Route
          path="/page-not-found"
          exact
          render={(props) => {
            if (userDetails) return <PageNotFound {...props} />;
            else return <Redirect to="/admin-login" />;
          }}
        />

        {/* BATCH */}
        <Route
          path="/batch/list"
          exact
          render={(props) => {
            if (userDetails) return <BatchList {...props} />;
            else return <Redirect to="/admin-login" />;
          }}
        />

        <Route
          path="/batch/edit/:id"
          exact
          render={(props) => {
            if (userDetails) return <EditBatch {...props} />;
            else return <Redirect to="/admin-login" />;
          }}
        />

        <Route
          path="/batch/new"
          exact
          render={(props) => {
            if (userDetails) return <NewBatch {...props} />;
            else return <Redirect to="/admin-login" />;
          }}
        />

        {/* TRAINER */}
        <Route
          path="/trainer/list"
          exact
          render={(props) => {
            if (userDetails) return <TrainerList {...props} />;
            else return <Redirect to="/admin-login" />;
          }}
        />

        <Route
          path="/trainer/edit/:id"
          exact
          render={(props) => {
            if (userDetails) return <EditTrainer {...props} />;
            else return <Redirect to="/admin-login" />;
          }}
        />

        <Route
          path="/trainer/new"
          exact
          render={(props) => {
            if (userDetails) return <NewTrainer {...props} />;
            else return <Redirect to="/admin-login" />;
          }}
        />

        {/* COURSE */}
        <Route
          path="/course/list"
          exact
          render={(props) => {
            if (userDetails) return <CourseList {...props} />;
            else return <Redirect to="/admin-login" />;
          }}
        />

        <Route
          path="/course/edit/:id"
          exact
          render={(props) => {
            if (userDetails) return <EditCourse {...props} />;
            else return <Redirect to="/admin-login" />;
          }}
        />

        <Route
          path="/course/new"
          exact
          render={(props) => {
            if (userDetails) return <NewCourse {...props} />;
            else return <Redirect to="/admin-login" />;
          }}
        />

        <Route
          path="/mock/student/list"
          exact
          render={(props) => {
            if (userDetails) return <ListStudents {...props} />;
            else return <Redirect to="/admin-login" />;
          }}
        />

        <Route
          path="/mock/student/new"
          exact
          render={(props) => {
            if (userDetails) return <AddMockStudent {...props} />;
            else return <Redirect to="/admin-login" />;
          }}
        />

        <Route path="/admin/register" exact component={AdminRegister} />

        <Route
          path="/admin-login"
          render={(props) => {
            if (userDetails) return <Redirect to="/" />;
            else return <AdminLogin {...props} />;
          }}
        />
      </Switch>
    </>
  );
}

export default App;