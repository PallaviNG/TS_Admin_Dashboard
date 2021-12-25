import { combineReducers } from "redux";
import { batchReducer } from "./BatchReducer";
import { trainerReducer } from './TrainerReducer';
import { studentReducer } from './StudentReducer';
import { TemplateReducer } from './TemplateReducer';
import { CourseReducer } from './CourseReducer';
import { NotificationReducer } from './NotificationReducer';
import { InterviewerReducer } from './InterviewerReducer';

let reducer = combineReducers({
  batchDetails: batchReducer,
  trainerDetails: trainerReducer,
  studentDetails: studentReducer,
  templateDetails: TemplateReducer,
  courseDetails: CourseReducer,
  notificationDetails: NotificationReducer,
  template_interviewerDetails:InterviewerReducer
});

export default reducer;
