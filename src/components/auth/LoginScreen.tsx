import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import styles from './LoginScreen.module.scss';
import toast from 'react-hot-toast';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FB_AUTH } from '../../services/firebase';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(true);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const handleLogin = async () => {
    toast.loading('Please wait....');
    try {
      if (isBtnDisabled) {
        toast.dismiss();
        toast.error('please enter valid input');
        return;
      }
      await signInWithEmailAndPassword(FB_AUTH, email, password);
      toast.dismiss();
      toast.success('successfully logged in');
    } catch (error: any) {
      toast.dismiss();
      toast.error('error');
      console.log('handleLogin Error:: ' + error);
    }
  };

  useEffect(() => {
    if (email.length <= 5 || password.length <= 5) {
      setIsBtnDisabled(true);
    } else {
      setIsBtnDisabled(false);
    }
  }, [email, password]);

  return (
    <div className={`${styles.container}`}>
      {isLoggedIn ? (
        <div className="flex flex-col justify-center items-center space-y-10">
          <div className="font-semibold text-xl">Already Logged In</div>
          <button className={`${styles.createButton} bg-[#131415] text-[#ffffff]`} onClick={() => navigate('/')}>
            Go to Home
          </button>
        </div>
      ) : (
        <div className={`${styles.formContainer}`}>
          <input
            className={`w-[425px] px-3 py-5 text-2xl leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded-xl appearance-none my[0.55rem] focus:outline-none focus:shadow-outline`}
            type="email"
            placeholder="please enter your email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={`w-[425px] px-3 py-5 text-2xl leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded-xl appearance-none my[0.55rem] focus:outline-none focus:shadow-outline`}
            type="password"
            placeholder="please enter your password"
            name="password"
            autoComplete="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            disabled={isBtnDisabled}
            className={`${styles.createButton} bg-[#131415] text-[#ffffff] ${isBtnDisabled && 'opacity-20 cursor-not-allowed'}`}
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginScreen;
