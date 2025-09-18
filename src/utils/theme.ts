import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      body: {
        minHeight: '100vh',
        bg: props.colorMode === 'light' ? 'yellow.900' : 'gray.800',
        color: props.colorMode === 'light' ? 'gray.900' : 'whiteAlpha.900',
        backgroundImage: props.colorMode === 'light' ? "url('/111.jpg')" : null,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      },
    }),
  },
})

export default theme
