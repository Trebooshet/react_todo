import { useNavigate } from 'react-router-dom'
import { Box, Button, Text } from '@chakra-ui/react'

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Box display="flex" flexDirection="column" justifyContent={'center'}>
      <Text mx={'auto'} mt={'14'} fontSize={'3xl'}>
        Page not found
      </Text>
      <Button mx={'auto'} my={'5'} maxW={'20%'} onClick={() => navigate('/')}>
        Go back
      </Button>
    </Box>
  )
}

export default NotFoundPage
