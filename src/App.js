import React from 'react'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Index from 'views/Index.js'
import LandingPage from 'views/examples/LandingPage.js'
import RegisterPage from 'views/examples/RegisterPage.js'
import ProfilePage from 'views/examples/ProfilePage.js'
import 'assets/css/nucleo-icons.css'
import 'assets/scss/blk-design-system-react.scss?v=1.2.0'
import 'assets/demo/demo.css'


const App = (props) => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/components" render={(props) => <Index {...props} />} />
        <Route
          path="/landing-page"
          render={(props) => <LandingPage {...props} />}
        />
        <Route
          path="/register-page"
          render={(props) => <RegisterPage {...props} />}
        />
        <Route
          path="/profile-page"
          render={(props) => <ProfilePage {...props} />}
        />
        <Redirect from="/" to="/components" />
      </Switch>
    </BrowserRouter>
  )
}

export default App



// request access to the user's MetaMask account
// async function requestAccount() {
// await window.ethereum.request({ method: 'eth_requestAccounts' });
// };

// web3Provider: null,
// contracts: { },
// account: '0x0',

// init: async function() {
//   return await App.initWeb3();
// },

// initWeb3: async function() {
//   if (typeof web3 !== 'undefined') {
//     // If a web3 instance is already provided by Meta Mask.
//     App.web3Provider = web3.currentProvider;
//     web3 = new Web3(web3.currentProvider);
//   } else {
//     // Specify default instance if no web3 instance provided
//     App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
//     web3 = new Web3(App.web3Provider);
//   }
//   return App.initContract();
// },

// initContract: function() {
//   $.getJSON("Election.json", election => {
//     // Instantiate a new truffle contract from the artifact
//     App.contracts.Election = TruffleContract(election);
//     // Connect provider to interact with contract
//     App.contracts.Election.setProvider(App.web3Provider);

//     return App.render();
//   });
// },
// // FIXME I think this whole render section can be refactored for our app bc the fetched info
// // needs to go out to external components rather than rendering JSX in place like lines 72 - 75
// render: function() {
//   var electionInstance;
//   var loader = $("#loader");
//   var content = $("#content");

//   loader.show();
//   content.hide();

//   // Load account data
//   web3.eth.getCoinbase( (err, account) => {
//     if (err === null) {
//       App.account = account;
//       $("#accountAddress").html("Your Account: " + account);
//     }
//   });

//   // Load contract data
//   App.contracts.Election.deployed().then( instance => {
//     electionInstance = instance;
//     return electionInstance.candidatesCount();
//   }).then( candidatesCount => {
//     var candidatesResults = $("#candidatesResults");
//     candidatesResults.empty();

//     for (var i = 1; i <= candidatesCount; i++) {
//       electionInstance.candidates(i).then( candidate => {
//         var id = candidate[0];
//         var name = candidate[1];
//         var voteCount = candidate[2];

//         // Render candidate Result
//         var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
//         candidatesResults.append(candidateTemplate);
//       });
//     }

//     loader.hide();
//     content.show();
//   }).catch( error => {
//     console.warn(error);
//   });
// }
// };
