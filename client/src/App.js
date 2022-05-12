
//This is the container for the components of my app.
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// My components imports
import Home from "./components/Home";
import RequireAuth from "./PrivateRoute";
import Journal from "./components/Journal";
import Meditation from "./components/Meditation";
import About from "./components/About";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import JEntry from "./components/JournalEntry";
import MEntry from "./components/MeditationEntry";
import JournalDisplay from "./components/JournalDisplay";
import MeditationDisplay from "./components/MeditationDisplay";
import Error from "./components/Error";
import Forbidden from "./components/Forbidden";
import NotFound from "./components/NotFound";
import contextConsumer from './Context';
import UpdateJournal from "./components/UpdateJournal";
import UpdateMeditation from "./components/UpdateMeditation";
import ResetRequest from "./components/ResetPasswordRequest";
import PassResetForm from "./components/PasswordResetForm";
import Contact from "./components/Contact";

// Giving my components access to all data in the contextl
const HeaderContext = contextConsumer(Header);
const Authenticated = contextConsumer(RequireAuth);
const JEntryContext = contextConsumer(JEntry);
const MEntryContext = contextConsumer(MEntry);
const JournalContext = contextConsumer(Journal);
const MeditationsContext = contextConsumer(Meditation);
const AboutContext = contextConsumer(About);
const SignUpContext = contextConsumer(SignUp);
const SignInContext = contextConsumer(SignIn);
const JournalDisplayContext = contextConsumer(JournalDisplay);
const MeditationDisplayContext = contextConsumer(MeditationDisplay);
const UpdateJournalContext = contextConsumer(UpdateJournal);
const UpdateMeditationContext = contextConsumer(UpdateMeditation);
const ResetRequestContext = contextConsumer(ResetRequest)
const PassResetFormContext = contextConsumer(PassResetForm);




function App() {
  return (
    <Router>
    <div>
      <HeaderContext />
      <Routes>
        {/* <Route path="/"  element={ <Navigate replace to="/home" /> }/> */}
        <Route path="/" element={<App />} />
        <Route index element={<Home />} />
        <Route element={<Authenticated/>}>
          <Route path="journal" element={<JournalContext />} />
          <Route path="meditations" element={<MeditationsContext />} />
          <Route path="meditations/create" element={<MEntryContext />} />
          <Route path="journal/entry" element={<JEntryContext />} />
          <Route path="journal/:id" element={<JournalDisplayContext/>} />
          <Route path="journal/:id/update" element={<UpdateJournalContext/>} />
          <Route path="meditations/:id" element={<MeditationDisplayContext/>} />
          <Route path="meditations/:id/update" element={<UpdateMeditationContext/>} />
        </Route>  
        <Route path="about" element={<AboutContext />} />
        <Route path="signup" element={<SignUpContext />} />
        <Route path="login" element={<SignInContext />} />
        <Route path="reset-password" element={<ResetRequestContext />} />
        <Route path="reset-password/:id/:id" element={<PassResetFormContext />} />
        <Route path="contact-me" element={ <Contact /> } />
        <Route path="error" element={<Error />} />
        <Route path="forbidden" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
