import {
  ButtonGroup,
  Button
} from '@chakra-ui/react'

const LayerOptions = ({ options, setOption, activeOption, themeColor }) => {
  let color = themeColor || 'green.400'

  return (
    <ButtonGroup
      isAttached
      boxShadow='dark-lg'
      size='sm'
      rounded={'sm'}
      borderStyle={'solid'}
      borderWidth={'1px'}
      borderColor={'gray.800'}
      overflow={'hidden'}
    >
      {options.map((option, ind) => 
        <Button
          onClick={() => setOption(option.name)}
          rounded={'none'}
          key={option.name}
          border={'none'}
          borderRightWidth={ind < options.length -1 ? '1px' : '0px' }
          borderRightColor={'gray.300'}
          borderRightStyle={'solid'}
          backgroundColor={activeOption == option.name ? color : 'white'}
          color={activeOption == option.name ? 'white' : 'gray.600'}
          _hover={{ 
            bg: activeOption == option.name ? color : 'gray.200'
          }}
          fontWeight='medium'
        >
          {option.label}
        </Button>
      )}
    </ButtonGroup>
  );
};

export default LayerOptions;