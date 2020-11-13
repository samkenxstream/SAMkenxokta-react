/*!
 * Copyright (c) 2017-2020Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import Home from './Home';
import Protected from './Protected';
import CustomLogin from './CustomLogin';
import SessionTokenLogin from './SessionTokenLogin';

class App extends Component {
  constructor(props) {
    super(props);
    this.onAuthRequired = this.onAuthRequired.bind(this);
  }

  onAuthRequired() {
    this.props.history.push('/login');
  }
  
  render() {
    return (
      <React.StrictMode>
        <Security
          oktaAuth={this.props.oktaAuth}
          onAuthRequired={this.onAuthRequired}
        >
          <Switch>
            <Route path='/login' component={CustomLogin}/>
            <Route path='/sessionToken-login' component={SessionTokenLogin}/>
            <SecureRoute exact path='/protected' component={Protected}/>
            <Route path='/implicit/callback' component={LoginCallback} />
            <Route path='/pkce/callback' component={LoginCallback} />
            <Route path='/' component={Home}/>
          </Switch>
        </Security>
        <a href="/?pkce=1">PKCE Flow</a> | <a href="/">Implicit Flow</a>
      </React.StrictMode>
    );
  }
}

export default withRouter(App);
