import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  import Dashboard from '../pages/Dashboard';
  import BatchOverview from '../pages/BatchOverview';
  import CreateProduction from '../pages/CreateProduction';
  import BatchDetails from '../pages/BatchDetails';
  import '../css/App.css';

function Navigation(){
    return (
        <Router>

        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/create-production">Create Production</Link>
            </li>
            <li>
              <Link to="/batch-overview">Batch Overview</Link>
            </li>
            <li>
              <Link to="/batch-details">Batch Details</Link>
            </li>
          </ul>
          <div className="zanga">zanga</div>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/create-production" component={CreateProduction} />
          <Route path="/batch-overview" component={BatchOverview} />
          <Route path="/batch-details" component={BatchDetails} />

        </Switch>

    </Router>
    )
}

export default Navigation