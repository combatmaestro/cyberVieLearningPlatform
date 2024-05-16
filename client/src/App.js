import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userRefresh } from './actions/userActions'

//components
import Home from './components/Home/Home'
import Header from './components/Header/Header'
import LandingPage from './components/LandingPage/LandingPage'
import ProfilePage from './components/ProfilePage/ProfilePage'
import ProtectedRoute from './routes/ProtectedRoutes'
import Loader from './components/Loader/Loader'
import Module from './components/Module/Module'
import AdminModules from './Admin/Modules/AdminModules'
import Leaderboard from './components/Leaderboard/Leaderboard'
import AdminTopics from './Admin/Topic/AdminTopics'
import AdminContent from './Admin/Content/Content'
import AdminUsers from './Admin/User/AdminUser'
import AdminCtfs from './Admin/Ctfs/AdminCtf'
import Transaction from './components/Transaction/Transaction'
import Success from './components/Transaction/Success/Success'
import Failure from './components/Transaction/Failure/Failure'
import AdminOrder from './Admin/Order/AdminOrder'
import ReactGA from 'react-ga'
import NoMatchPage from './components/NoMatchPage/NoMatchPage'

function App() {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.user)

  useEffect(() => {
    // To Report Page View
    ReactGA.initialize('UA-103644054-1')
    ReactGA.pageview(window.location.pathname + window.location.search)

    //to refresh user
    // dispatch(userRefresh())
  }, [dispatch])
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Router>
            <div>
              <Header />
              <Switch>
                <Route exact path='/' component={LandingPage} />
                <ProtectedRoute exact path='/profile' component={ProfilePage} />
                <ProtectedRoute exact path='/home' component={Home} />
                <ProtectedRoute exact path='/module/:id' component={Module} />
                <ProtectedRoute
                  exact
                  path='/transaction'
                  component={Transaction}
                />
                <ProtectedRoute
                  exact
                  path='/transactionStatus/success'
                  component={Success}
                />
                <ProtectedRoute
                  exact
                  path='/transactionStatus/failure/:order_id'
                  component={Failure}
                />
                <ProtectedRoute
                  exact
                  path='/topic/content/:id'
                  // component={TopicContent}
                />
                <ProtectedRoute
                  exact
                  path='/admin/modules'
                  component={AdminModules}
                  roles={['admin', 'teacher']}
                />
                <ProtectedRoute
                  exact
                  path='/admin/users'
                  component={AdminUsers}
                  roles={['admin']}
                />
                <ProtectedRoute
                  exact
                  path='/leaderboard'
                  component={Leaderboard}
                />
                <ProtectedRoute
                  exact
                  path='/admin/topics/:id'
                  component={AdminTopics}
                  roles={['admin', 'teacher']}
                />
                <ProtectedRoute
                  exact
                  path='/admin/ctfs/:id'
                  component={AdminCtfs}
                  roles={['admin', 'teacher']}
                />
                <ProtectedRoute
                  exact
                  path='/admin/content/:id'
                  component={AdminContent}
                  roles={['admin', 'teacher']}
                />
                <ProtectedRoute
                  exact
                  path='/admin/transactions'
                  component={AdminOrder}
                  roles={['admin']}
                />

                <Route component={NoMatchPage} />
              </Switch>
            </div>
          </Router>
        </>
      )}
    </>
  )
}

export default App
