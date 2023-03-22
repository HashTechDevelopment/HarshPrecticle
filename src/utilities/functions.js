import {showMessage} from 'react-native-flash-message';

export const printLog = (tag, message) => {
  console.log(tag, message);
};

export const ToastMessage = msg => {
  showMessage({message: msg});
};
