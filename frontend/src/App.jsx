import React, { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home.jsx';
import Header from "./components/header";
import NotificationsBar from "./components/NotificationsBar";
import Students from './pages/Students.jsx';
import { userDummyData } from './assets/assets.js';
import InternshipsList from './pages/InternshipsList.jsx';
import InternshipDetails from './pages/InternshipDetails.jsx';
import AddInternshipForm from './pages/AddInternship.jsx';

const App = () => {
  // Stats state
  const [stats, setStats] = useState({
    internships: 19,
    students: 60,
    matched: 40,
    notMatched: 20,
  });

  // Last model run time
  const [lastModelTime, setLastModelTime] = useState("2 hrs ago");

  // Notifications
  const notifications = [
    "Student 'Nitin Goyal' has successfully registered for the Advanced AI Internship program.",
    "New internship opportunity added by Bajaj Pvt Ltd for students specializing in Electronics and Communication.",
    "Match completed successfully for Student 'Rishit' with the Fullstack Developer Internship at Infosys.",
    "Student 'Aman Kumar' updated his profile including skills, resume, and contact information."
  ];

  return (
    <div>
      <Header />
      <NotificationsBar notifications={notifications} />
      
      <Routes>
        <Route
          path='/'
          element={
            <Home
              stats={stats}
              setStats={setStats}
              lastModelTime={lastModelTime}
              setLastModelTime={setLastModelTime}
            />
          }
        />
        <Route path='/students' element={<Students students={userDummyData} lastModelTime={lastModelTime}
              setLastModelTime={setLastModelTime}/>}/>
        <Route path='/internships' element={<InternshipsList/>}/>
        
        <Route
          path='/addInternship'
          element={
            <AddInternshipForm
              internships={stats.internships}
              setInternships={(newCount) => setStats({...stats, internships: newCount})}
              matched={stats.matched}
              setMatched={(newCount) => setStats({...stats, matched: newCount})}
              notMatched={stats.notMatched}
              setNotMatched={(newCount) => setStats({...stats, notMatched: newCount})}
              lastModelTime={lastModelTime}
              setLastModelTime={setLastModelTime}
            />
          }
        />

        <Route path="/internship/:id" element={<InternshipDetails />} />
      </Routes>
    </div>
  )
}

export default App
