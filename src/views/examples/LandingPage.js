import React, { useEffect, useState } from 'react'

// This function detects most providers injected at window.ethereum
// import detectEthereumProvider from '@metamask/detect-provider'

import { ethers } from 'ethers'

// react plugin used to create charts
import { Line } from 'react-chartjs-2'
// reactstrap components
import {
  Table,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Col,
} from 'reactstrap'

import bigChartData from 'variables/charts.js'

// core components
import ExamplesNavbar from 'components/Navbars/ExamplesNavbar.js'
import Footer from 'components/Footer/Footer.js'




const LandingPage = () => {
  // const [candidates, setCandidates] = useState([
  //   {
  //     id: null,
  //     name: '',
  //     voteCount: 0,
  //   },
  // ])

  var provider
  /*************************************************************/
  /* Step 1: Init Metamask                                     */
  /*  Connect to the default http://localhost:8545             */
  /*  const provider = new ethers.providers.JsonRpcProvider(); */
  /*************************************************************/

  const initProvider = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum)

    // Get the balance of an account (by address or ENS name, if supported by network)
    // const balance = (await provider.getBalance())

    // console.log('this is my provider', provider)
    // console.log('this is my signer', signer)
    // console.log('this is my balance', balance)
  }

  initProvider()

  /*************************************************************************/
  /* Step 2: Detect/Handle chain (network) and chainChanged (per EIP-1193) */
  /*************************************************************************/
  const chainId = async () => {
    return await window.ethereum.request({ method: 'eth_chainId' })
    // window.ethereum.on('chainChanged', handleChainChanged(chainId))
  }

  function handleChainChanged(_chainId) {
    // Add code to handle new _chainId then reload
    console.log('reloading page')
    window.location.reload()
  }

  /*******************************************************************/
  /* Step 3: Handle user accounts and accountsChanged (per EIP-1193) */
  /*******************************************************************/
  let currentAccount = null

  // FIXME change to async
  window.ethereum
    .request({ method: 'eth_accounts' })
    .then(handleAccountsChanged)
    .catch((err) => {
      // eth_accounts will return an empty array.
      console.error(err)
    })

  // Note that this event is emitted on page load.
  // If the array of accounts is non-empty, you're already
  // connected.
  window.ethereum.on('accountsChanged', handleAccountsChanged)

  // eth_accounts return an array
  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.')
    } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0]
    }
  }

  // useEffect(() => {
  //   document.body.classList.toggle('landing-page')
  //   // Specify how to clean up after this effect:
  //   return function cleanup() {
  //     document.body.classList.toggle('landing-page')
  //   }
  // }, [])

  // Contract address or ENS like "dai.tokens.ethers.eth"
  // const electionAddress = 'Election.json'
  const electionAddress = '0x8cFBBE48BdAC02d2A9F3AB98f5ba7529a63FF9e5'
  // Contract ABI. Ignore any methods not needed
  // Human readable example: Get the account balance. "function balanceOf(address) view returns (uint)",
  const electionAbi = [
    {
      inputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'candidates',
      outputs: [
        {
          internalType: 'uint16',
          name: 'voteCount',
          type: 'uint16',
        },
        {
          internalType: 'uint256',
          name: 'id',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: 'name',
          type: 'string',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'candidatesCount',
      outputs: [
        {
          internalType: 'uint16',
          name: '',
          type: 'uint16',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
  ]
  
  
  function CandidateInfo(_id, _name, _voteCount){
    this.id = _id
    this.name = _name
    this.voteCount = _voteCount
  }
  
  const getCandidateInfo = async () => {
    // FIXME Convert electionInfoArray, candidate count etc into State Vars for REACT
    const electionInfoArray = []
    // connect signer to metamask acct. instantiate contract instance obj
    const contractInstance = new ethers.Contract(electionAddress,electionAbi,provider)
    const totalCandidates = await contractInstance.candidatesCount()
   
    for (let i = 0; i < totalCandidates; i++) {
      const candidate = await contractInstance.candidates(i)
      let candInfo = new CandidateInfo(candidate.id, candidate.name, candidate.voteCount)
      // FIXME this is the spot where we whould be updating the state variable
      // then another ui function can check the state var for info
      electionInfoArray[i] = candInfo
    }
    return electionInfoArray
  }
      

  getCandidateInfo().then(data => {
    console.log(data)
  })
  
  // for (let i = 0; i < candidateCount; i++) {
  //   const candidate = candidates[i];
  //   electionCandidate.id = candidate.id
  //   electionCandidate.name = candidate.name
  //   electionCandidate.voteCount = candidate.voteCount
  // }

  // console.log('QQQQQQQQQQQ', ...electionCandidate)

  // get the data from the contract
  // const getElectionCandidates = async () => {
  //   let cInfo
  //   let cCount = await electionContract.candidatesCount
  //   for (let i = 0; i < cCount; i++) {
  //     const candidate = electionContract.candidates[i]
  //     const id = candidate.id
  //     const name = candidate.name
  //     const voteCount = candidate.voteCount

  //     cInfo = candidate
  //   }
  //   console.log('lhfkfj', cInfo)
  //   return cInfo
  // }

  // const candidate = getElectionCandidates()

  // const getCandidates = async () => {
  //   const candidateCount = await electionContract().candidatesCount()
  //   console.log('Candidate Count: ', candidateCount)
  //   for (let i = 0; i <= candidateCount; i++) {
  //     await electionContract()
  //       .candidates(i)
  //       .then((contractCandidate) => {
  //         let newCandidateObject = {
  //           id: contractCandidate.id,
  //           name: contractCandidate.name,
  //           voteCount: contractCandidate.voteCount,
  //         }
  //         console.log('Candidates pulled: ', contractCandidate.name,)
  //         setCandidates([i].push(newCandidateObject))
  //       })
  //   }
  // }

  const formatTableData = (_count, candidates) => {
    return (
      <tr>
        <td className="text-center">_count</td>
        <td className="text-center">_candidateObject.name</td>
        <td className="text-center">_candidateObject.voteCount</td>
      </tr>
    )
  }

  /*************************************************************************/
  /* We create a new MetaMask onboarding object to use in our app          */
  /* Using the '@metamask/onboarding' library                              */
  /*************************************************************************/
  // const onboarding = new MetaMaskOnboarding({ forwarderOrigin })
  //This will start the onboarding proccess
  // const onClickInstall = () => {
  //   onboardButton.innerText = 'Onboarding in progress'
  //   onboardButton.disabled = true
  //   //On this object we have startOnboarding which will start the onboarding process for our end user
  //   onboarding.startOnboarding()
  // }

  // is metamask installed
  // FIXME Implement this but as React //If it isn't installed we ask the user to click to install it
  // onboardButton.innerText = 'Click here to install MetaMask!';
  //When the button is clicked we call this function
  // onboardButton.onclick = onClickInstall;
  //The button is now disabled
  // onboardButton.disabled = false;
  const isMetaMaskInstalled = () => window.ethereum.isMetaMaskInstalled
  isMetaMaskInstalled
    ? console.log('METAMASK IS INSTALLED')
    : alert('Install Metamask browser extension to connect Dapp.')

  // can Metamask provider can talk to ethereum chain
  const isMetamaskConnected = () => window.ethereum.isConnected()
  // get Metamask chain id
  const getChainId = async () => {
    return await window.ethereum.request({ method: 'eth_chainId' })
  }
  // get Metamask network id
  const getNetworkId = async () => {
    return await window.ethereum.request({ method: 'net_version' })
  }

  // function to connect dapp with metamask wallet
  // TODO Provide a button to allow the user to connect MetaMask to the dapp. Clicking this button should call the following method:
  // const connectToDapp = async () => {
  //   try {
  //     const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
  //     const account = accounts[0]
  //     return account
  //   } catch (error) {
  //     // if error code 4001 user rejected request
  //     if (error.code === 4001) {
  //       console.log('You must connect to MetaMask.')
  //     } else {
  //       console.log('Error connecting to metamask account:\n', error)
  //       return error
  //     }
  //   }
  // }

  // if (isMetamaskConnected) {
  //   ethereum.autoRefreshOnNetworkChange = false
  //   // print to UI or log state chainId, networkId, and connect status
  //   // TODO networkId = await getNetworkId()
  //   // TODO chainId = await getChainId()
  //   console.log('Metamask connected:', isMetamaskConnected())
  //   // connect dapp with metamask wallet account
  //   connectToDapp()
  // } else {
  //   alert('Connect available ethereum network!')
  //   console.log('Connect available ethereum network!')
  // }

  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="path"
            src={require('assets/img/blob.png').default}
          />
          <img
            alt="..."
            className="path2"
            src={require('assets/img/path2.png').default}
          />
          <img
            alt="..."
            className="shapes triangle"
            src={require('assets/img/triunghiuri.png').default}
          />
          <img
            alt="..."
            className="shapes wave"
            src={require('assets/img/waves.png').default}
          />
          <img
            alt="..."
            className="shapes squares"
            src={require('assets/img/patrat.png').default}
          />
          <img
            alt="..."
            className="shapes circle"
            src={require('assets/img/cercuri.png').default}
          />
          <div className="content-center">
            <Row className="row-grid justify-content-between align-items-center text-left">
              <Col lg="6" md="6">
                <h1 className="text-white">
                  We keep your coin <br />
                  <span className="text-white">secured</span>
                </h1>
                <p className="text-white mb-3">
                  A wonderful serenity has taken possession of my entire soul,
                  like these sweet mornings of spring which I enjoy with my
                  whole heart. I am alone, and feel...
                </p>
                <div className="btn-wrapper mb-3">
                  <p className="category text-success d-inline">
                    From 9.99%/mo
                  </p>
                  <Button
                    className="btn-link"
                    color="success"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    <i className="tim-icons icon-minimal-right" />
                  </Button>
                </div>
                <div className="btn-wrapper">
                  <div className="button-container">
                    <Button
                      className="btn-icon btn-simple btn-round btn-neutral"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button
                      className="btn-icon btn-simple btn-round btn-neutral"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-dribbble" />
                    </Button>
                    <Button
                      className="btn-icon btn-simple btn-round btn-neutral"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-facebook" />
                    </Button>
                  </div>
                </div>
              </Col>
              <Col lg="4" md="5">
                <img
                  alt="..."
                  className="img-fluid"
                  src={require('assets/img/etherum.png').default}
                />
              </Col>
            </Row>
          </div>
        </div>

        <Container>
          <Card className="card-coin card-plain">
            <Table hover dark>
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Votes</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <td className="text-center">1</td>
                  <td className="text-center">fake_candidate_1</td>
                  <td className="text-center">fake_number_votes</td>
                </tr>
                <tr>
                  <td className="text-center">2</td>
                  <td className="text-center">fake_candidate_2</td>
                  <td className="text-center">fake_number_votes again</td>
                </tr> */}
              </tbody>
            </Table>
          </Card>
        </Container>

        <section className="section section-lg">
          <section className="section">
            <img
              alt="..."
              className="path"
              src={require('assets/img/path4.png').default}
            />
            <Container>
              <Row className="row-grid justify-content-between">
                <Col className="mt-lg-5" md="5">
                  <Row>
                    <Col className="px-2 py-2" lg="6" sm="12">
                      <Card className="card-stats">
                        <CardBody>
                          <Row>
                            <Col md="4" xs="5">
                              <div className="icon-big text-center icon-warning">
                                <i className="tim-icons icon-trophy text-warning" />
                              </div>
                            </Col>
                            <Col md="8" xs="7">
                              <div className="numbers">
                                <CardTitle tag="p">3,237</CardTitle>
                                <p />
                                <p className="card-category">Awards</p>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col className="px-2 py-2" lg="6" sm="12">
                      <Card className="card-stats upper bg-default">
                        <CardBody>
                          <Row>
                            <Col md="4" xs="5">
                              <div className="icon-big text-center icon-warning">
                                <i className="tim-icons icon-coins text-white" />
                              </div>
                            </Col>
                            <Col md="8" xs="7">
                              <div className="numbers">
                                <CardTitle tag="p">3,653</CardTitle>
                                <p />
                                <p className="card-category">Commits</p>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-2 py-2" lg="6" sm="12">
                      <Card className="card-stats">
                        <CardBody>
                          <Row>
                            <Col md="4" xs="5">
                              <div className="icon-big text-center icon-warning">
                                <i className="tim-icons icon-gift-2 text-info" />
                              </div>
                            </Col>
                            <Col md="8" xs="7">
                              <div className="numbers">
                                <CardTitle tag="p">593</CardTitle>
                                <p />
                                <p className="card-category">Presents</p>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col className="px-2 py-2" lg="6" sm="12">
                      <Card className="card-stats">
                        <CardBody>
                          <Row>
                            <Col md="4" xs="5">
                              <div className="icon-big text-center icon-warning">
                                <i className="tim-icons icon-credit-card text-success" />
                              </div>
                            </Col>
                            <Col md="8" xs="7">
                              <div className="numbers">
                                <CardTitle tag="p">10,783</CardTitle>
                                <p />
                                <p className="card-category">Forks</p>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col md="6">
                  <div className="pl-md-5">
                    <h1>
                      Large <br />
                      Achivements
                    </h1>
                    <p>
                      I should be capable of drawing a single stroke at the
                      present moment; and yet I feel that I never was a greater
                      artist than now.
                    </p>
                    <br />
                    <p>
                      When, while the lovely valley teems with vapour around me,
                      and the meridian sun strikes the upper surface of the
                      impenetrable foliage of my trees, and but a few stray.
                    </p>
                    <br />
                    <a
                      className="font-weight-bold text-info mt-5"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Show all{' '}
                      <i className="tim-icons icon-minimal-right text-info" />
                    </a>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </section>
        <section className="section section-lg">
          <img
            alt="..."
            className="path"
            src={require('assets/img/path4.png').default}
          />
          <img
            alt="..."
            className="path2"
            src={require('assets/img/path5.png').default}
          />
          <img
            alt="..."
            className="path3"
            src={require('assets/img/path2.png').default}
          />
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <h1 className="text-center">Your best benefit</h1>
                <Row className="row-grid justify-content-center">
                  <Col lg="3">
                    <div className="info">
                      <div className="icon icon-primary">
                        <i className="tim-icons icon-money-coins" />
                      </div>
                      <h4 className="info-title">Low Commission</h4>
                      <hr className="line-primary" />
                      <p>
                        Divide details about your work into parts. Write a few
                        lines about each one. A paragraph describing a feature
                        will.
                      </p>
                    </div>
                  </Col>
                  <Col lg="3">
                    <div className="info">
                      <div className="icon icon-warning">
                        <i className="tim-icons icon-chart-pie-36" />
                      </div>
                      <h4 className="info-title">High Incomes</h4>
                      <hr className="line-warning" />
                      <p>
                        Divide details about your product or agency work into
                        parts. Write a few lines about each one. A paragraph
                        describing feature will be a feature.
                      </p>
                    </div>
                  </Col>
                  <Col lg="3">
                    <div className="info">
                      <div className="icon icon-success">
                        <i className="tim-icons icon-single-02" />
                      </div>
                      <h4 className="info-title">Verified People</h4>
                      <hr className="line-success" />
                      <p>
                        Divide details about your product or agency work into
                        parts. Write a few lines about each one. A paragraph
                        describing be enough.
                      </p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section section-lg section-safe">
          <img
            alt="..."
            className="path"
            src={require('assets/img/path5.png').default}
          />
          <Container>
            <Row className="row-grid justify-content-between">
              <Col md="5">
                <img
                  alt="..."
                  className="img-fluid floating"
                  src={require('assets/img/chester-wade.jpg').default}
                />
                <Card className="card-stats bg-danger">
                  <CardBody>
                    <div className="justify-content-center">
                      <div className="numbers">
                        <CardTitle tag="p">100%</CardTitle>
                        <p className="card-category text-white">Safe</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <Card className="card-stats bg-info">
                  <CardBody>
                    <div className="justify-content-center">
                      <div className="numbers">
                        <CardTitle tag="p">573 K</CardTitle>
                        <p className="card-category text-white">
                          Satisfied customers
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <Card className="card-stats bg-default">
                  <CardBody>
                    <div className="justify-content-center">
                      <div className="numbers">
                        <CardTitle tag="p">10 425</CardTitle>
                        <p className="card-category text-white">Business</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6">
                <div className="px-md-5">
                  <hr className="line-success" />
                  <h3>Awesome features</h3>
                  <p>
                    The design system comes with three pre-built pages to help
                    you get started faster. You can change the text and images
                    and you're good to go.
                  </p>
                  <ul className="list-unstyled mt-5">
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div className="icon icon-success mb-2">
                          <i className="tim-icons icon-vector" />
                        </div>
                        <div className="ml-3">
                          <h6>Carefully crafted components</h6>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div className="icon icon-success mb-2">
                          <i className="tim-icons icon-tap-02" />
                        </div>
                        <div className="ml-3">
                          <h6>Amazing page examples</h6>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div className="icon icon-success mb-2">
                          <i className="tim-icons icon-single-02" />
                        </div>
                        <div className="ml-3">
                          <h6>Super friendly support team</h6>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section section-lg">
          <img
            alt="..."
            className="path"
            src={require('assets/img/path4.png').default}
          />
          <img
            alt="..."
            className="path2"
            src={require('assets/img/path2.png').default}
          />
          <Col md="12">
            <Card className="card-chart card-plain">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <hr className="line-info" />
                    <h5 className="card-category">Total Investments</h5>
                    <CardTitle tag="h2">Performance</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={bigChartData.data}
                    options={bigChartData.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </section>
        <section className="section section-lg section-coins">
          <img
            alt="..."
            className="path"
            src={require('assets/img/path3.png').default}
          />
          <Container>
            <Row>
              <Col md="4">
                <hr className="line-info" />
                <h1>
                  Choose the coin{' '}
                  <span className="text-info">that fits your needs</span>
                </h1>
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid"
                      src={require('assets/img/bitcoin.png').default}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col className="text-center" md="12">
                        <h4 className="text-uppercase">Light Coin</h4>
                        <span>Plan</span>
                        <hr className="line-primary" />
                      </Col>
                    </Row>
                    <Row>
                      <ListGroup>
                        <ListGroupItem>50 messages</ListGroupItem>
                        <ListGroupItem>100 emails</ListGroupItem>
                        <ListGroupItem>24/7 Support</ListGroupItem>
                      </ListGroup>
                    </Row>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button className="btn-simple" color="primary">
                      Get plan
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid"
                      src={require('assets/img/etherum.png').default}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col className="text-center" md="12">
                        <h4 className="text-uppercase">Dark Coin</h4>
                        <span>Plan</span>
                        <hr className="line-success" />
                      </Col>
                    </Row>
                    <Row>
                      <ListGroup>
                        <ListGroupItem>150 messages</ListGroupItem>
                        <ListGroupItem>1000 emails</ListGroupItem>
                        <ListGroupItem>24/7 Support</ListGroupItem>
                      </ListGroup>
                    </Row>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button className="btn-simple" color="success">
                      Get plan
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid"
                      src={require('assets/img/ripp.png').default}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col className="text-center" md="12">
                        <h4 className="text-uppercase">Bright Coin</h4>
                        <span>Plan</span>
                        <hr className="line-info" />
                      </Col>
                    </Row>
                    <Row>
                      <ListGroup>
                        <ListGroupItem>350 messages</ListGroupItem>
                        <ListGroupItem>10K emails</ListGroupItem>
                        <ListGroupItem>24/7 Support</ListGroupItem>
                      </ListGroup>
                    </Row>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button className="btn-simple" color="info">
                      Get plan
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
        <Footer />
      </div>
    </>
  )
}

export default LandingPage
