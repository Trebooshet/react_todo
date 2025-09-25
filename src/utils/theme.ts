import { extendTheme } from '@chakra-ui/react'
import type { StyleFunctionProps } from '@chakra-ui/theme-tools'

const theme = extendTheme({
  components: {
    Button: {
      variants: {
        filled: (props: StyleFunctionProps) => ({
          bg: props.colorMode === 'light' ? 'blue.200' : 'gray.700',
          color: props.colorMode === 'light' ? 'black' : 'white',
          _hover: {
            bg: props.colorMode === 'light' ? 'blue.300' : 'gray.600',
          },
        }),
      },
      defaultProps: {
        variant: 'filled',
      },
    },
    Input: {
      variants: {
        filled: (props: StyleFunctionProps) => ({
          field: {
            bg: props.colorMode === 'light' ? 'white' : 'gray.700',
            color: props.colorMode === 'light' ? 'black' : 'white',
            _placeholder: {
              color: props.colorMode === 'light' ? 'gray.600' : 'gray.300',
            },
            _hover: {
              bg: props.colorMode === 'light' ? 'gray.100' : 'gray.600',
            },
            _focus: {
              bg: props.colorMode === 'light' ? 'white' : 'gray.700',
            },
          },
        }),
      },
      defaultProps: {
        variant: 'filled',
      },
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        minHeight: '100vh',
        bg: props.colorMode === 'light' ? 'black' : 'gray.800',
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
