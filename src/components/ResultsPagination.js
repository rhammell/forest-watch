import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import '@fontsource/archivo/700.css'

import {
  Box,
  Text,
  Flex,
  Button
} from '@chakra-ui/react'

const ResultsPagination = ({ projects, total, page, pageSize, handlePage }) => {
  return (
    <Flex
      borderTopColor={'gray.300'}
      borderTopWidth={'1px'}
      borderTopStyle={'solid'}
      p={2}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Box
        flex={1}
      >
        {page > 0 &&
          <ChevronLeftIcon
            onClick={() => handlePage(page - 1)}
            float={'right'}
            boxSize={5}
            cursor='pointer'
          />
        }
      </Box>
      <Text
        fontSize={'sm'}
      >
        {1 + pageSize * page} - {pageSize * page + projects.length} of {total.toString()} Projects
      </Text>
      <Box
        flex={1}
      >
        <ChevronRightIcon
          boxSize={5}
          float={'left'}
          onClick={() => handlePage(page + 1)}
          cursor='pointer'
        />
      </Box>
    </Flex>
  );
};

export default ResultsPagination;