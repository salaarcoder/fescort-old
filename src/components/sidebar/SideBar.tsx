import { signOut } from 'firebase/auth';
import React from 'react';
import { FB_AUTH } from '../../services/firebase';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { logOut } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  //
  const handleLogout = async () => {
    toast.loading('Please wait....');
    try {
      if (!isLoggedIn) return;
      await signOut(FB_AUTH);
      dispatch(logOut());
      toast.dismiss();
      toast.success('successfully logged out');
    } catch (e: any) {
      toast.dismiss();
      toast.error('something went wrong');
      console.log('handleLogout Error:: ' + e);
    }
  };
  //
  return (
    <>
      <div className="flex flex-col justify-start items-center space-x-8">
        <div>SideBar</div>
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/movies')}>Movies</button>
        <button onClick={() => navigate('/create')}>Create</button>
        <button onClick={() => navigate('/favorites')}>Favorites</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default SideBar;
