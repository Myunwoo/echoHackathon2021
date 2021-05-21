import React from "react";
import Map_Page from "./Map_Page";
import Main_Page from "./Main_Page";
import Login_Page from "./Login_Page";

import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';


class App extends React.Component{
  state={

  }
  render(){
    return(
      <>
        <Router>
          <Switch>
            <Route path='/main' component={Main_Page} />
            <Route path='/map' component={Map_Page} />
            <Route path='login' component={Login_Page} />
            <Route render={() => <div className='error'>error</div>}/>
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
