// import * as React from 'react';
// import dayjs from 'dayjs';
// import Grid from '@mui/material/Grid';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import { ValueContext } from '../../App';
// import { useContext } from 'react';

// const Date = () => {
// const today = dayjs();

//     const { bookingDateAndTime, setBookingDateAndTime } = useContext(ValueContext);

//     console.log(bookingDateAndTime);

// const handleDateChange = (event ) => {
//             const date = event.$D
//             const month = event.$M+1
//             const year = event.$y
//             // const hour = event.$H
//             // const mins = event.$m
//             const dateAndTime = `${date}/${month}/${year}`
//             //console.log(event.$D, event.$M+1, event.$y, event.$H, event.$m);
//             //console.log(dateAndTime);
//             //console.log( ${hour}:${mins});
//             setBookingDateAndTime(dateAndTime)
//         }
    

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Grid
//         container
//         columns={{ xs: 1, lg: 2 }}
//         spacing={4}
//         alignItems="center"
//         justifyContent="center"
//       >
//         <Grid item>
//           <DateCalendar defaultValue={today} disablePast onChange={handleDateChange}/>
//         </Grid>
//       </Grid>
//     </LocalizationProvider>
//   );
// }
//   export default Date;

import * as React from 'react';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { ValueContext } from '../../App';
import { useContext } from 'react';

const Date = () => {
  const today = dayjs();
  const { bookingDateAndTime, setBookingDateAndTime } = useContext(ValueContext);

  const handleDateChange = (date) => {
    //date.preventDefault();
    const formattedDate = dayjs(date).format('DD/MM/YYYY'); // Format date as required
    setBookingDateAndTime(formattedDate); // Set the selected date in the context
   // handleDateSelection(formattedDate); // Pass the selected date back to the parent component
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container columns={{ xs: 1, lg: 2 }} spacing={4} alignItems="center" justifyContent="center">
        <Grid item>
          <DateCalendar defaultValue={today} disablePast onChange={handleDateChange} />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default Date;
