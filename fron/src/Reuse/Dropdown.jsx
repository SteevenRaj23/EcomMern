import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

export default function SelectLabels({status,OrderNumber}) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    if(event.target.value === 10 || event.target.value === ""){
       axios.put(`https://ecom-mern-seven.vercel.app/orderStatus/${OrderNumber}`,{status:"shipped"})
         .then((res)=>{console.log(res)})
    }
    if(event.target.value === 20){
      axios.put(`https://ecom-mern-seven.vercel.app/orderStatus/${OrderNumber}`,{status:"pending"})
        .then((res)=>{console.log(res)})
   }
    console.log(OrderNumber)
    console.log(event.target.value)
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          style={{fontWeight:"bold"}}
        >
          <MenuItem value="">
            {status}
          </MenuItem>
          {status === "pending" ? (<MenuItem value={10}>Shipped</MenuItem>):( <MenuItem value={20}>Pending</MenuItem>)}   
        </Select>
      </FormControl>
    </div>
  );
}
