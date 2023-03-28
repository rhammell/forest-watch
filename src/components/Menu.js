import logo_alpha from '../img/logo_alpha.png';
import '@fontsource/raleway/400.css'
import '@fontsource/archivo/700.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/amaranth/400.css'
import Loading from './Loading'
import Project from './Project'


import {
  Flex,
  Box,
  Center,
  Image,
  Text,
  VStack
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react';

const Menu = ({projects, total, offset, pageSize, isLoading, selectedId, handleSelect }) => {
  return (
      <Flex
        width={'500px'}
        height={'94vh'}
        position='absolute'
        top={'3vh'}
        left={'60px'}
        zIndex={100}
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
          backgroundColor={'white'}
          borderBottomColor={'gray.300'}
          borderBottomWidth={'1px'}
          borderBottomStyle={'solid'}
          p={2}
          w={'100%'}
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
        <Box
          overflowY={'auto'}
          h={'100%'}
          w={'100%'}
          p={2}
          backgroundColor={'gray.100'}
        >
          <VStack
            h={'100%'}
            spacing={2}
          >
            {isLoading ? 
              <Loading />
              : 
              <>
                {projects.map(project => <Project project={project} key={project.Id} selectedId={selectedId} handleSelect={handleSelect}/>)}
              </>
            }
          </VStack>
          
        </Box>
      </Flex>

  );
};

export default Menu;