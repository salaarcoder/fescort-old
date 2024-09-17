import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import styles from './CustomPage.module.scss';
import Header from '../../header/Header';
import SideBar from '../../sidebar/SideBar';
import LoginScreen from '../../auth/LoginScreen';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { onAuthStateChanged } from 'firebase/auth';
import { login, logOut } from '../../../store/authSlice';
import { FB_AUTH } from '../../../services/firebase';

export default function CustomPage({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  //
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FB_AUTH, (user) => {
      console.log({ u: FB_AUTH.currentUser });
      if (user) {
        // User is signed in, dispatch to store
        dispatch(login({ userId: user.uid, userName: user.displayName || '', userEmail: user.email || '' }));
      } else {
        // User is signed out, clear the user from Redux store
        dispatch(logOut());
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [FB_AUTH, dispatch]);

  return (
    <div className={`${styles.container}`}>
      <Toaster />
      {!isLoggedIn ? (
        <LoginScreen />
      ) : (
        <>
          <div className={`${styles.layout}`}>
            <div className={`${styles.sidebarContainer}`}>
              <SideBar />
            </div>
            <div className={`${styles.contentContainer}`}>
              <div className={`${styles.headerContainer}`}>
                <Header />
              </div>
              <div className={`${styles.bodyContainer}`}>{children}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
