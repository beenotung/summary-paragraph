import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import ErrorComponent from '../components/Error'
import { RootState } from '../redux/store'
import { getSummaryReportList as getSummaryReportListThunk } from '../redux/summary'
import './HistoryPage.scss'

export function HistoryPage() {
  const error = useSelector((state: RootState) => state.summary.error)
  const idList = useSelector((state: RootState) => state.summary.idList)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!error && !idList) {
      dispatch(getSummaryReportListThunk())
    }
  }, [dispatch, error, idList])
  function renderBody() {
    if (error) {
      return <ErrorComponent error={error} action="load history list" />
      // return ErrorComponent({ error, action: 'load history list' })
    }
    if (!idList) {
      return <p>Loading history list...</p>
    }
    return (
      <ul>
        {idList.map(id => (
          <li key={id}>
            <Link to={'/report/' + id}>{id}</Link>
          </li>
        ))}
      </ul>
    )
  }
  return (
    <div className="HistoryPage">
      <h2>History Page</h2>
      {renderBody()}
    </div>
  )
}

export default HistoryPage
