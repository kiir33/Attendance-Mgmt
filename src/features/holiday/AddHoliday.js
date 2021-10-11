import React, { useState } from 'react'
import { Button, TextField, Stack } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useDispatch } from 'react-redux';
import { postHoliday, patchHoliday } from './holidaySlice'
import Message from '../../component/Message';
import { useHistory } from 'react-router';



const AddHoliday = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { method, data } = props.location.state;
  const [title, setTitle] = useState(data.title ? data.title : "");
  const [description, setDescription] = useState(data.description ? data.description : "");
  const [date, setDate] = useState(data.date ? new Date(data.date) : new Date());
  const handleSubmit = (event) => {
    event.preventDefault()
    const payload = { title, date, description };

    method === "post" ?
      dispatch(postHoliday(payload))
        .unwrap()
        .then((promiseResult) => {
          const [result, error] = promiseResult;
          promiseHandler(result, error);
        })
      :
      dispatch(patchHoliday({ data: payload, holidayId: data.id }))
      .unwrap()
        .then((promiseResult) => {
          const [result, error] = promiseResult;
          promiseHandler(result, error);
        })
  }

  const [message, setMessage] = useState("");
  const [messageVisibility, setMessageVisibility] = useState(false);
  const [messageSeverity, setMessageSeverity] = useState("info");
  const promiseHandler = (result, error) => {
    if (!error) {
      setMessage("Success!")
      setMessageVisibility(true);
      setMessageSeverity("success");

    } else {
      setMessage("Something went wrong");
      setMessageVisibility(true);
      setMessageSeverity("warning");
    }
    setTimeout(() => {
      setMessage("");
      setMessageVisibility(false);
      setMessageSeverity("info");
    }, 5000)

  }

  return (
    <>
      <Message
        values={{
          severity: messageSeverity,
          title: message, message: ""
        }}
        display={messageVisibility ? "flex" : "none"} />

      <form onSubmit={(e) => {
        handleSubmit(e)
      }}>
        <Stack sx={{padding: 4, width: 0.6}}>
          <TextField
            margin="normal"
            id="title"
            name="title"
            label="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
            }
            }
          />
          <TextField
            margin="normal"
            id="description"
            name="description"
            label="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
            }}
            sx={{
              marginBottom: 4
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
            
              label="Date"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        <Button variant="contained"
        sx={{width:0.2, marginTop: 4}}
          type="submit"
        >Add to list</Button>
        </Stack>

      </form>
    </>
  )
}

export default AddHoliday
