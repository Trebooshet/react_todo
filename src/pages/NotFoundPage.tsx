import { useNavigate } from 'react-router-dom'
import { Button } from '@chakra-ui/react'

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Page not found</h1>
      <Button onClick={() => navigate('/')}>Go back to Home page</Button>
    </div>
  )
}

export default NotFoundPage
