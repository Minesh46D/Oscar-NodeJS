import './App.css';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { store } from './Tasks/CrudwithRedux/store';
// import CrudwithRedux from './Tasks/CrudwithRedux/CrudwithRedux';
import CrudAPIwithRedux from './Tasks/Crud-API-with-Redux/CrudAPIwithRedux';
import { store } from './Tasks/Crud-API-with-Redux/store';
import Darkmode from './Node/Darkmode';
import { useEffect, useState } from 'react';

// import ReduxPractice from './Practice/Redux/ReduxPractice';
// import { store } from './Practice/Redux/Store';

function App() {
  
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    if(theme === "dark"){
      document.documentElement.classList.add('dark');
    }else{
      document.documentElement.classList.remove("dark");
    }
  }, [theme])
  

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <>
      <div className='h-screen bg-gradient-to-r from-cyan-500 to-blue-500 dark:bg-slate-700 flex justify-center items-center'>
        <button onClick={handleThemeSwitch} className="bg-green-200 p-4 rounded-3xl dark:text-white dark:bg-black">
          Dark Mode
        </button>
      </div>
      {/* <Provider store={store}>
        <ReduxPractice/>
      </Provider> */}
      {/* <Provider store={store}> */}
        {/* <CrudwithRedux/> */}
        {/* <CrudAPIwithRedux/> */}
      {/* </Provider> */}
      {/* <Darkmode/> */}
    </>
  );
}

export default App;
