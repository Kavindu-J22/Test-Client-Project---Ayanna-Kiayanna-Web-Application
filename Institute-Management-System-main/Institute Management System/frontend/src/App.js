import ExamPortal from "./pages/ExamPortal/examportal";
//import Header from '../src/components/Headers/TeacherHeader/tHeader'
// import SHeader from '../src/components/Headers/StudentHeader/sHeader'
import Res from "../src/pages/ResultsList-Teacher/resultList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ClassAdd from "../src/pages/AddClass/ClassAdd";
import RejectClass from "../src/pages/RejectClass/RejectClass";
import AddPayment from "./pages/StudentPayment/AddPayment";

// import TeacherProfile from "./pages/techerProfile/profile";

//import AddPayment from './pages/StudentPayment/AddPayment'
//import updatePayment from './pages/StudentPayment/updatePayment'
//import AddOnlinePayment from './pages/StudentPayment/AddOnlinePayment'
import updatePayment from "./pages/StudentPayment/updatePayment";

import Class from "../src/pages/StudentViewClass/StudentViewClass";
import UpdateClass from "../src/pages/UpdateClass/UpdateClass";
import EditPayment from "../src/pages/StudentPayment/editPayment";

//Student Management

import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import MyNotes from "./pages/MyNotes/MyNotes";
import CreateNote from "./pages/MyNotes/CreateNote";
import SingleNote from "./pages/MyNotes/SingleNote";
import { useState } from "react";
import UserProfile from "./pages/UserProfile/UserProfile";

import Answers from "./pages/answerList-Teacher/answers";
import ExamList from "./pages/examList-teacher/examList";
import OnGoingExam from "./pages/onGoing Exam/onGoingExam";
import MyResults from "./pages/myResults/myResults";

//Sam check Css
// import Request from "../src/pages/request/delatils";

//Devmi check Css

import UpdateExam from "../src/pages/examList-teacher/updateBtn";
import UpdateResults from "../src/pages/ResultsList-Teacher/updateBtn";

//teacher management
import TeacherProfile from "./pages/techerProfile/profile";

import AddOnlinePayment from "./pages/StudentPayment/AddOnlinePayment";

import TLogin from "./pages/teacherLogin/tLogin";

//Attendance Management
import AddAttendance from "./pages/AddAttendance/AddAttendance";
import ViewAttendance from "./pages/ViewAttendance/ViewAttendance";
import EditAttendance from "./pages/EditAttendance/EditAttendance";

//Janani check Css

import SubmitAnswer from "./pages/Exam submission/submitAnswer";
import ExamReport from "./pages/Report-exam/examReport";

function App() {
  const [search, setSearch] = useState("");
  return (
    <div>
      <Router>
        <Switch>
          {/* Student management */}
          <Route path="/" component={LandingPage} exact />
          <Route path="/login" component={LoginPage} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/createnote" component={CreateNote} />
          <Route path="/note/:id" component={SingleNote} />
          <Route
            path="/mynotes"
            component={() => <MyNotes search={search} />}
          />
          {/* Exam function routes */}
          <Route path="/teacher/exam" exact component={ExamList} />
          <Route path="/teacher/res" exact component={Res} />
          <Route path="/teacher/ans" exact component={Answers} />
          <Route path="/teacher/addClass" exact component={ClassAdd} />
          <Route path="/teacher/rejectClass" exact component={RejectClass} />
          <Route path="/student/" exact component={ExamPortal} />
          <Route path="/student/goexam" exact component={OnGoingExam} />
          <Route path="/student/exams" exact component={OnGoingExam} />
          <Route path="/student/goresult" exact component={MyResults} />
          <Route path="/student/results" exact component={MyResults} />
          <Route path="/goexam" component={ExamPortal} />
          <Route path="/student/attempt/:_id" component={SubmitAnswer} />
          <Route path="/teacher/rep" component={ExamReport} />
          <Route path="/exam/edit/:_id" component={UpdateExam} />
          <Route path="/teacher/res/edit/:_id" component={UpdateResults} />
          {/* Student request routes */}
          <Route path="/student/request" component={Request} />

          {/* Teacher manage routes */}

          <Route path="/my-profile/:email" exact component={TeacherProfile} />
          <Route path="/teacher-login" exact component={TLogin} />

          {/* Teacher manage routes */}

        

          <Route path="/student/class" component={Class} />
          <Route path="/teacher/up/:Subjectid" exact component={UpdateClass} />

         
          {/* Attendance Management Routes */}

          <Route path="/teacher/addAttendance" component={AddAttendance} />

          <Route
            path="/teacher/getAttendance"
            component={ViewAttendance}
            setSearch={setSearch}
            search={search}
          />
          <Route
            path="/teacher/editAttendance/:_id"
            component={EditAttendance}
          />

          {/* <Route path="/teacher/:profileId" component={TeacherProfile} /> */}

          {/* Payment function route */}
          <Route path="/student/uploadSlip" component={AddPayment} />

          

          {/* Payment function route */}
          <Route path="/student/uploadSlip" component={AddPayment} />

          <Route path="/student/onlinePay" component={AddOnlinePayment} />
          <Route path="/student/myPayments" component={updatePayment} />
          <Route
            path="/student/editPayment/:student_id"
            component={EditPayment}
          />

          {/* Payment function route */}
          <Route path="/student/uploadSlip" component={AddPayment} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
