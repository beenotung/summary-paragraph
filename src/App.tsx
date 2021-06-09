import React from 'react'
import './App.scss'
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import HistoryPage from './pages/HistoryPage'
import NotMatchPage from './pages/NotMatchPage'
import ReportPage from './pages/ReportPage';

function App() {
  return (
    <div className="App">
      <h2>App</h2>
      <div className="menu">
        <Link to="/home">Home</Link>
        <Link to="/history">History</Link>
        <Link to="/fake">Fake</Link>
      </div>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/history" component={HistoryPage} />
        <Route path="/report/:id" component={ReportPage} />
        <Route component={NotMatchPage} />
      </Switch>
    </div>
  )
}

export default App
