import { createSwitchNavigator } from 'react-navigation';
import Welcome from './Welcome';
import LogIn from './LogIn';
import SignUp from './SignUp';
import SignUpEmail from './SignUpEmail';
import SignUpLocation from './SignUpLocation';
import ResetPassword from './ResetPassword';

const AuthStack = createSwitchNavigator({
  Welcome,
  LogIn,
  SignUp,
  SignUpEmail,
  SignUpLocation,
  ResetPassword,
}, {
  initialRouteName: 'Welcome',
});

export default AuthStack;
