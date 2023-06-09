import '@fontsource/raleway/400.css'
import '@fontsource/archivo/700.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/amaranth/400.css'
import Loading from './Loading'
import Results from './Results'
import ResultsPagination from './ResultsPagination'
import LogoHeader from './LogoHeader'

import { Flex } from '@chakra-ui/react'

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
      <LogoHeader />
      
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