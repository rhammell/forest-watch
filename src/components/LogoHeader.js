import logo_alpha from '../img/logo_alpha.png';
import '@fontsource/raleway/400.css'
import '@fontsource/archivo/700.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/amaranth/400.css'

import {
  Center,
  Image,
  Text
} from '@chakra-ui/react'

const LogoHeader = () => {
  return (
    <Center
      borderBottomColor={'gray.300'}
      borderBottomWidth={'1px'}
      borderBottomStyle={'solid'}
      p={2}
    >
      <Image
        src={logo_alpha}
        alt='Logo'
        w={'70px'}
      />
      <Text
        fontSize='3xl'
        fontFamily={`'Amaranth','Archivo', 'Raleway', serif`}
      >
        Forest
      </Text>
      <Text
        fontSize='3xl'
        fontFamily={`'Archivo', 'Raleway', serif`}
        color='green'
      >
        Watch
      </Text>
    </Center>
  );
};

export default LogoHeader;