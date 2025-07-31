import Typography from '@mui/material/Typography'
import { styled, keyframes } from '@mui/material/styles'

const blinking = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`;

const BlinkTypography = styled(Typography)(() => ({
  animation: `${blinking} 1s ease-in infinite alternate`,
}))

export default BlinkTypography
