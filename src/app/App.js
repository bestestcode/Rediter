import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Route, Router, Switch } from 'react-router';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';

import { history } from '../_common/helpers';
import store from '../store/store';
import Feed from '../components/feed/Feed';
import { SubredditList, SubredditAdd } from '../components/subreddits';
import SubsLoader from '../components/SubsLoader';

require('./App.css');

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Navbar>
          <Nav>
            <IndexLinkContainer to="/">
              <NavItem>My Feed</NavItem>
            </IndexLinkContainer>
            <LinkContainer to="/subreddits">
              <NavItem>Subreddits</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar>

        <div className="container">
          <Switch>
            <Route path="/subreddits/new" component={SubredditAdd} />
            <Route path="/subreddits" component={SubredditList} />
            <SubsLoader component={Feed} />
          </Switch>
        </div>

        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
        />
      </div>
    </Router>
  </Provider>
);

export default App;
