import Project from './Project'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import '@fontsource/archivo/700.css'

import {
  Box,
  Center, 
  VStack,
  Text,
  Flex,
  Button
} from '@chakra-ui/react'

const Results = ({ projects, selectedId, handleSelect, total, page, pageSize, handlePage }) => {
  return (
      <Box
        overflowY={'auto'}
        flex={1}
        p={2}
        backgroundColor={'gray.100'}
      >
        <VStack
          h={'100%'}
          spacing={2}
          pb={2}
        >
          {projects.map(project => <Project project={project} key={project.Id} selectedId={selectedId} handleSelect={handleSelect}/>)}
        </VStack>
      </Box>
  );
};

export default Results;