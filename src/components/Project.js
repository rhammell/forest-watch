import '@fontsource/archivo/700.css'
import '../css/style.css'

import {
  Flex,
  Box,
  Heading,
  Text,
  Tag,
  Spacer,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Link
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import scrollIntoView from 'scroll-into-view';
import { useEffect, useRef } from 'react';
import ReactReadMoreReadLess from "react-read-more-read-less";

const Project = ({ project, selectedId, handleSelect }) => {
  const elRef = useRef(null)

  // Effect called when selectedId updates
  useEffect(() => {

    // Scroll to element if selected
    if (selectedId == project.Id) {
      // Scroll to element
      scrollIntoView(elRef.current, {
        time: 4000,
        align:{top: 0, topOffset: 7}
      })
    }
  }, [selectedId])


  return (
    <Box
      ref={elRef}
      backgroundColor={'white'}
      borderWidth={'1px'}
      borderStyle={'solid'}
      borderColor={selectedId == project.Id ? 'gray.500' : 'gray.300'}
      boxShadow={selectedId == project.Id ? 'md' : ''}
      w={'100%'}
      p={3}
      rounded="sm"
      onClick={() => handleSelect(project.Id)}
      cursor='pointer'
    >
      <Flex
        alignItems='start'
        mb={3}
      >
        <Heading
          fontSize='lg'
          fontFamily={`'Archivo', 'Raleway', serif`}
          color="gray.700"
        >
          {project.Name}
        </Heading>
        <Spacer />
        <Tag
          size={'sm'}
          variant='solid'
          backgroundColor='green.500'
          textAlign={'center'}
          minW='fit-content'
          ml={1}
        >
          {project.Acreage}
        </Tag>
      </Flex>
        <Text
          fontSize='xs'
        >
        <ReactReadMoreReadLess
          charLimit={340}
          readMoreText={"Read more"}
          readLessText={"Read less"}
        >
            {project.Description}
        </ReactReadMoreReadLess>
          
        </Text>
      <TableContainer
        mt={2}
        overflow='hidden'
      >
        <Table 
          size='sm'
        >
          <Tbody>
            <Tr>
              <Td fontWeight={'bold'} fontSize={'xs'} >State</Td>
              <Td fontSize={'xs'}>{project.State}</Td>
            </Tr>
            <Tr>
              <Td fontWeight={'bold'} fontSize={'xs'}>Category</Td>
              <Td fontSize={'xs'}>{project.CategoryName}</Td>
            </Tr>
            <Tr>
              <Td fontWeight={'bold'} fontSize={'xs'}>Proponent</Td>
              <Td fontSize={'xs'}>{project.ProponentName}</Td>
            </Tr>
            <Tr>
              <Td fontWeight={'bold'} fontSize={'xs'}>Credit Period</Td>
              <Td fontSize={'xs'}>{project.CreditPeriod}</Td>
            </Tr>
            <Tr>
              <Td fontWeight={'bold'} fontSize={'xs'}>Annual Reductions</Td>
              <Td fontSize={'xs'}>{project.EmissionReductions}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Text
        fontSize={'xs'}
        mt={2}
        float='right'
      >
        <Link
          size="sm"
          href={'https://registry.verra.org/app/projectDetail/VCS/' + project.Id}
          isExternal
        >
          View on Verra <ExternalLinkIcon />
        </Link>
      </Text>

    </Box>
  );
};

export default Project;