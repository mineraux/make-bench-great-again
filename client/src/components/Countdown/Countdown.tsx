import React, { FunctionComponent, useState, useEffect } from 'react'

type Props = {
  endDate?: string
}

const Countdown: FunctionComponent<Props> = ({
  endDate = 'December 31 2019 23:59:59 GMT+0200',
}) => {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

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
    <div>
      <p>{days} days</p>
      <p>{hours} hours</p>
      <p>{minutes} minutes</p>
      <p>{seconds} seconds</p>
    </div>
  )
}

export default Countdown
