import GridLoader from "react-spinners/GridLoader";

import {
  Box,
  Center
} from '@chakra-ui/react'

const Loading = () => {
  return (
    <Center
      h={'100%'}
    >
      <Box paddingBottom={30} >
        <GridLoader color="green" />
      </Box>
    </Center>
  );
};

export default Loading;