import { RootDispatch } from './store'
import { api } from '../api/stub'
import { push } from 'connected-react-router'

export type SummaryState = {
  reports: Record<ID, SummaryReport>
  idList: ID[] | null
  error: Error | null
}

export type ID = string | number

export type SummaryReport = {
  id: number
  paragraphs: string[]
  keywords: string[]
}

export type SummaryAction =
  | {
      type: '@@Summary/got-report'
      report: SummaryReport
    }
  | {
      type: '@@Summary/got-error'
      error: Error
    }
  | {
      type: '@@Summary/reset-error'
    }
  | {
      type: '@@Summary/got-id-list'
      idList: ID[]
    }

export function getSummaryReportByTextThunk(body: {
  text: string
  sentence: number
}) {
  return async (dispatch: RootDispatch) => {
    try {
      const result = await api.post['/summary']({ body })
      dispatch({
        type: '@@Summary/got-report',
        report: result,
      })
      dispatch(push('/report/' + result.id))
    } catch (error) {
      dispatch({
        type: '@@Summary/got-error',
        error,
      })
    }
  }
}

export function getSummaryReportByIdThunk(id: ID) {
  return async (dispatch: RootDispatch) => {
    try {
      let result = await api.get['/report/:id']({
        params: { id: id.toString() },
      })
      dispatch({
        type: '@@Summary/got-report',
        report: result,
      })
    } catch (error) {
      dispatch({
        type: '@@Summary/got-error',
        error,
      })
    }
  }
}

export function getSummaryReportList() {
  return async (dispatch: RootDispatch) => {
    try {
      const idList = await api.get['/report/id-list']()
      dispatch({
        type: '@@Summary/got-id-list',
        idList,
      })
    } catch (error) {
      dispatch({
        type: '@@Summary/got-error',
        error,
      })
    }
  }
}

const initialState: SummaryState = {
  reports: {},
  error: null,
  idList: null,
}

export const reducer = (
  state: SummaryState = initialState,
  action: SummaryAction,
): SummaryState => {
  switch (action.type) {
    case '@@Summary/got-report':
      return {
        ...state,
        reports: {
          ...state.reports,
          [action.report.id]: action.report,
        },
        error: null,
      }
    case '@@Summary/got-error':
      return {
        ...state,
        reports: state.reports,
        error: action.error,
      }
    case '@@Summary/reset-error': {
      return {
        ...state,
        reports: state.reports,
        error: null,
      }
    }
    case '@@Summary/got-id-list': {
      return {
        ...state,
        error: null,
        idList: action.idList,
      }
    }
    default:
      return state
  }
}

export default reducer
