import { useEffect, useState } from 'react'

export const Clock = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    setInterval(() => {
      setTime(new Date())
    }, 1000)
  }, [])
  return (
    <>
      <div> {time.toLocaleDateString()}</div>
      <div> 🕒 {time.toLocaleTimeString()}</div>
    </>
  )
}

export default Clock
