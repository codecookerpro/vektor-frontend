import theme from 'theme'

const getStatusColor = status => {
  switch (status) {
    case 'success':
      return theme.custom.palette.lightGreen
    case 'error':
      return theme.custom.palette.red
    default:
      return theme.custom.palette.lightGreen
  }
};

export default getStatusColor;