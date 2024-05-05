import { LinearProgress } from '@mui/material';

const LoadingPage = () => {
  return (
    <div>
         {/* <CircularProgress variant="determinate" value={progress} /> */}
         <LinearProgress color="success" />
    </div>
  )
}

export default LoadingPage