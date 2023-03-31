import logo_alpha from '../img/logo_alpha.png';
import '@fontsource/raleway/400.css'
import '@fontsource/archivo/700.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/amaranth/400.css'
import Loading from './Loading'
import Results from './Results'
import ResultsPagination from './ResultsPagination'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

import {
  Flex,
  Box,
  Center,
  Image,
  Text,
  VStack,
  Link,
  Button
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react';

const Menu = ({ projects, total, page, pageSize, isLoading, selectedId, handleSelect, handlePage }) => {
  return (
    <Flex
      width={'500px'}
      height={'94vh'}
      position='absolute'
      top={'3vh'}
      left={'60px'}
      zIndex={1000}
      backgroundColor={'white'}
      boxShadow='dark-lg'
      rounded={'sm'}
      borderStyle={'solid'}
      borderWidth={'1px'}
      borderColor={'gray.800'}
      direction={'column'}
      overflow={'hidden'}
    >
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

      {isLoading ?
        <Loading /> :
        <Results
          projects={projects}
          selectedId={selectedId}
          handleSelect={handleSelect}
          total={total}
          page={page}
          pageSize={pageSize}
        />
      }

      {(projects && projects.length) &&
        <ResultsPagination page={page} pageSize={pageSize} total={total} projects={projects} handlePage={handlePage}/>
      }


    </Flex>

  );
};

export default Menu;