import React, { FunctionComponent, useState, useEffect } from 'react'
import ClassNames from 'classnames'
import './countdown.scss'

export enum themes {
  Blue = 'blue',
  Green = 'green',
}

type Props = {
  endDate?: string
  theme?: themes
}

const Countdown: FunctionComponent<Props> = ({
  endDate = '06/12/2019 15:00:00 GMT+0200',
  theme = themes.Green,
}) => {
  const [days, setDays] = useState<number | null>(null)
  const [hours, setHours] = useState<number | null>(null)
  const [minutes, setMinutes] = useState<number | null>(null)
  const [seconds, setSeconds] = useState<number | null>(null)

  const endDateTime = new Date(endDate).getTime()

  const calculate = () => {
    const startDate = new Date()
    const startDateTime = startDate.getTime()

    let timeRemaining = (endDateTime - startDateTime) / 1000 // in seconds

    if (timeRemaining >= 0) {
      setDays(Math.floor(timeRemaining / (60 * 60 * 24)))
      timeRemaining = timeRemaining % (60 * 60 * 24)

      setHours(Math.floor(timeRemaining / (60 * 60)))
      timeRemaining = timeRemaining % (60 * 60)

      setMinutes(Math.floor(timeRemaining / 60))
      timeRemaining = timeRemaining % 60

      setSeconds(Math.floor(timeRemaining))
    }
  }

  useEffect(() => {
    if (!isNaN(endDateTime as any)) {
      const interval = setInterval(calculate, 1000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [])

  return (
    <div className={ClassNames('countdown', `theme-${theme}`)}>
      {days !== null && hours !== null && minutes !== null && (
        <p>
          {('0' + hours).slice(-2)}
          <span>:</span>
          {('0' + minutes).slice(-2)}
        </p>
      )}
    </div>
  )
}

export default Countdown
