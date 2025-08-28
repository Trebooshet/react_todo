import { VStack, Heading, IconButton, useColorMode } from '@chakra-ui/react';
import { GoMoon, GoSun } from 'react-icons/go';

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <VStack
        mt="2"
        position="relative"
      >
        <IconButton
          position="absolute"
          right={5}
          top={4}
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
          mb={'2'}
        >
          To Do App
        </Heading>
      </VStack>
    </>
  );
}
