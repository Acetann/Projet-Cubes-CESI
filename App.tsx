import 'react-native-gesture-handler';
import { AppNavContainer } from "./src/navigations";
import { GlobalProvider } from './src/context/globalProviders';

  const App = () =>{
  return (
    <GlobalProvider>
      <AppNavContainer />
    </GlobalProvider>
      
  );
}

export default App;
