import { useContext } from 'react'
import NavBar from "./components/NavBar/NavBar"
import SignUpForm from './components/SignUpForm/SignUpForm'
import SignInForm from './components/SignInForm/SignInForm'
import Landing from './components/Landing/Landing'
import Dashboard from './components/Dashboard/Dashboard'
import HootList from './components/HootList/HootList'
import * as hootService from './services/hootService';
import { useContext, useState, useEffect } from 'react';
import HootDetails from './components/HootDetails/HootDetails';
import HootForm from './components/HootForm/HootForm';
import { Routes, Route, useNavigate } from 'react-router';





function App() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate();


  const [hoots, setHoots] = useState([]);


  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();

      setHoots(hootsData);

    };
    if (user) fetchAllHoots();
  }, [user]);


  const handleAddHoot = async (hootFormData) => {
    const newHoot = await hootService.create(hootFormData);
    setHoots([newHoot, ...hoots]);
    navigate('/hoots');
  };
};

const handleDeleteHoot = async (hootId) => {
  const deletedHoot = await hootService.deleteHoot(hootId);
  setHoots(hoots.filter((hoot) => hoot._id !== deletedHoot._id));
  navigate('/hoots');
};

const handleUpdateHoot = async (hootId, hootFormData) => {
  const updatedHoot = await hootService.update(hootId, hootFormData);
  setHoots(hoots.map((hoot) => (hootId === hoot._id ? updatedHoot : hoot)));
  navigate(`/hoots/${hootId}`);
};

return (
  <>
    <NavBar />
    <h1>Hey there!</h1>

    <Routes>
      <Route path='/' element={user ? <Dashboard /> : <Landing />} />
      {user ? (
        <>
          <Route path='/hoots' element={<HootList />} />
          <Route path='/hoots/:hootId' element={<HootDetails />}
          />
        </>
      ) : (
        <>
          <Route path='/sign-up' element={<SignUpForm />} />
          <Route path='/sign-in' element={<SignInForm />} />
        </>
      )}
      <Route path='/hoots' element={<HootList hoots={hoots} />} />
      <Route path='/hoots/:hootId' element={<HootDetails handleDeleteHoot={handleDeleteHoot} />}
      />
      <Route path='/hoots/new' element={<HootForm handleAddHoot={handleAddHoot} />}
      />
      <Route path='/hoots/:hootId/edit' element={<HootForm handleUpdateHoot={handleUpdateHoot} />}
      />
    </Routes>
  </>
);


export default App
