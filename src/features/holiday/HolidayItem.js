import React, {useState} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { deleteHoliday, getHolidays } from './holidaySlice';
import { useDispatch } from 'react-redux';
import Message from '../../component/Message';



const HolidayItem = ({ holiday }) => {
  const dispatch = useDispatch();
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
    <div>
      <Message
        values={{
          severity: messageSeverity,
          title: message, message: ""
        }}
        display={messageVisibility ? "block" : "none"} />

      <Card sx={{ minWidth: 275, margin: 4 }}>
        <CardContent>

          <Typography variant="h5" component="div">
            {holiday.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {holiday.date}
          </Typography>
          <Typography variant="body2">
            <p>{holiday.descriptions}</p>
          </Typography>
        </CardContent>
        <CardActions>
          <Link
            to={{
              pathname: `/holiday/edit/${holiday.id}`,
              state: {
                data: holiday,
                method: "patch"
              }
            }}
            style={{
              textDecoration: "none",
              color: "dark"
            }}
          >
            <Button size="small">Edit</Button>
          </Link>
          <Button size="small"
            onClick={() => {
              dispatch(deleteHoliday(holiday.id))
              .unwrap()
              .then((promiseResult)=> {
                const [result, error] = promiseResult;
                promiseHandler(result, error);
                dispatch(getHolidays());
              });
            }}>Delete</Button>

        </CardActions>
      </Card>
    </div>
  )
}

export default HolidayItem
