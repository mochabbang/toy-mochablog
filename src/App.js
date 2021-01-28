import React, { useState, useEffect } from 'react';
import { Head } from './inc';
import { Main } from './page';


function App() {

  const [login, setLogin] = useState(false);

  useEffect(() => {
    if(sessionStorage.login)
      setLogin(true);
  }, []);

  const checkLogin = () => {
    setLogin(true);
    return sessionStorage.setItem('login', true);
  }

  const checkLogout = () => {
    setLogin(false);
    return sessionStorage.removeItem('login');
  }

  return (    
    <div>
      <div>
          <Head 
            login={login}
            checkLogin={checkLogin}
            checkLogout={checkLogout} />
      </div>
      <div>
          <Main login={login} />
      </div>
    </div>
  );
}

export default App;
