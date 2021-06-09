import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useStateProxy } from 'use-state-proxy'
import { useParams } from 'react-router'
import { RootState } from '../redux/store'
import { getSummaryReportByIdThunk } from '../redux/summary'
import './ReportPage.scss'
import ErrorComponent from '../components/Error'

type Params = {
  id: string
}

export function Word(props: {
  word: string
  keywords: string[]
  onClick?: () => void
  highlight?: boolean
}) {
  const isKeyword = props.keywords.includes(props.word)
  if (!isKeyword) {
    return <span>{props.word}</span>
  }
  let className = 'keyword'
  if (props.highlight) {
    className += ' highlight'
  }
  return (
    <span className={className} onClick={props.onClick}>
      {props.word}
    </span>
  )
}

export function ReportPage() {
  const { id } = useParams<Params>()
  const error = useSelector((state: RootState) => state.summary.error)
  const report = useSelector((state: RootState) => state.summary.reports[id])
  const dispatch = useDispatch()
  const state = useStateProxy({ clicked: [] as string[] })
  useEffect(() => {
    dispatch({
      type: '@@Summary/reset-error',
    })
  }, [dispatch])
  useEffect(() => {
    if (id && !report) {
      dispatch({
        type: '@@Summary/reset-error',
      })
      dispatch(getSummaryReportByIdThunk(id))
    }
  }, [id, report, dispatch])
  function renderBody() {
    if (error) {
      return <ErrorComponent error={error} action="load report" />
    }
    if (!report) {
      return <p>Loading report...</p>
    }
    return (
      <>
        <div className="report">
          {report.paragraphs.map((paragraph, i) => (
            <p className="paragraph" key={i}>
              {splitText(paragraph, report.keywords).map((word, i) => (
                <Word
                  word={word}
                  keywords={report.keywords}
                  key={i}
                  highlight={state.clicked.includes(word)}
                  onClick={() =>
                    state.clicked.includes(word) || [
                      state.clicked.push(word),
                      (state.clicked = state.clicked.slice(-5)),
                    ]
                  }
                />
              ))}
            </p>
          ))}
        </div>
        <pre hidden>
          <code>{JSON.stringify(report.keywords, null, 2)}</code>
        </pre>
      </>
    )
  }
  return (
    <div className="ReportPage">
      <h2>Summary Report #{id}</h2>
      {renderBody()}
    </div>
  )
}

export default ReportPage

function splitText(paragraph: string, keywords: string[]): string[] {
  type Part = {
    text: string
    isKeyword: boolean
  }
  let parts: Part[] = [{ text: paragraph, isKeyword: false }]
  keywords
    .sort((a, b) => b.length - a.length)
    .forEach(keyword => {
      let newParts: Part[] = []
      parts.forEach(part => {
        if (part.isKeyword) {
          newParts.push(part)
          return
        }
        part.text.split(keyword).forEach(text => {
          newParts.push(
            { text, isKeyword: false },
            { text: keyword, isKeyword: true },
          )
        })
        newParts.pop()
      })
      parts = newParts
    })
  return parts.map(part => part.text)
}
