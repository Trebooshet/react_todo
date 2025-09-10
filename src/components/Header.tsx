import { GoMoon, GoSun } from 'react-icons/go';
import { Heading, IconButton, useColorMode,VStack } from '@chakra-ui/react';

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <VStack
        position="relative"
        mt={'-2'}
      >
        <IconButton
          position="absolute"
          right={5}
          top={5}
          icon={colorMode === 'light' ? <GoMoon /> : <GoSun />}
          rounded="full"
          aria-label="Theme - switcher"
          onClick={toggleColorMode}
        />
        <Heading
          as="h1"
          fontSize="50px"
          fontWeight="extrabold"
          bgGradient="linear(to-r, orange.700, orange.500, orange.300)"
          bgClip={'text'}
          mb={'1'}
        >
          To Do App
        </Heading>
      </VStack>
    </>
  );
}
