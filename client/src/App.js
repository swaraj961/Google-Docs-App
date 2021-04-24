import { TextEditor } from "./componets/TextEditor";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect  
} from "react-router-dom";
import {v4 as uudidV4 } from 'uuid'; 

function App() {
  return (
   <Router>
    <Switch>
       <Route exact path='/'>
        <Redirect to={`documents/${uudidV4()}`}>

        </Redirect>
       </Route>

       <Route path='/documents/:id'>
       <TextEditor/>
         </Route>
    </Switch>

   </Router>
  );
}

export default App;
