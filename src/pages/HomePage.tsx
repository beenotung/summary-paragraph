import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { getSummaryReportByTextThunk } from '../redux/summary'
import { RootState, RootDispatch } from '../redux/store'
import ErrorComponent from '../components/Error'

type InputData = {
  text: string
  sentence: number
}

export function HomePage() {
  const error = useSelector((state: RootState) => state.summary.error)
  const dispatch = useDispatch<RootDispatch>()
  const { register, handleSubmit } = useForm<InputData>({
    defaultValues: {
      text: '',
      sentence: 7,
    },
  })
  useEffect(() => {
    dispatch({
      type: '@@Summary/reset-error',
    })
  }, [dispatch])
  function submit(data: InputData) {
    console.log('submit:', data)
    dispatch(getSummaryReportByTextThunk(data))
  }
  return (
    <div>
      <h2>Home Page</h2>
      <ErrorComponent error={error} action="submit summary report" />
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <input type="number" {...register('sentence')} />
        </div>
        <div>
          <textarea
            {...register('text')}
            style={{
              width: '80vw',
              height: '50vh',
              margin: '2rem',
            }}
          />
        </div>
        <input type="submit" value="Summarize" />
      </form>
    </div>
  )
}

export default HomePage
