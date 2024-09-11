import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../../services/firebase';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { logOut } from '../../store/authSlice';

const SideBar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  //
  const handleLogout = async () => {
    toast.loading('Please wait....');
    try {
      if (!isLoggedIn) return;
      await signOut(auth);
      dispatch(logOut());
      toast.dismiss();
      toast.success('successfully logged out');
    } catch (e: any) {
      toast.dismiss();
      toast.error('something went wrong');
      console.log('handleLogout Error:: ' + e);
    }
  };
  //admin@salaarcoder.com
  return (
    <>
      <div>SideBar</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default SideBar;
