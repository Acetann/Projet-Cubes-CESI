import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGOUT } from '../../../constants/actionTypes'

export default () => (dispatch: any) => {
    AsyncStorage.removeItem('currentToken');
    AsyncStorage.removeItem('currentUser');
    dispatch({
        type: LOGOUT,
    });
};
