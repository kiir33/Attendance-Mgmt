import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/StaticDatePicker';
import { IconButton, TextField, Button, Stack, Divider } from '@mui/material';
import { KeyboardReturn } from '@mui/icons-material';
import Message from '../../component/Message';
import { postRequest, patchRequest } from '../../features/request/requestSlice';


const RequestForm = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { method } = props.location.state
    const existingRequest = history.location.state.requestData;
    const [message, setMessage] = useState("");
    const [messageVisibility, setMessageVisibility] = useState('none');
    const [messageSeverity, setMessageSeverity] = useState("info");
    const [from, setFrom] = useState(existingRequest ? new Date(existingRequest.from) : new Date());
    const [to, setTo] = useState(existingRequest ? new Date(existingRequest.to) : new Date());
    const [remarks, setRemarks] = useState(existingRequest ? existingRequest.remarks : "");


    const handleSubmit = (event) => {
        event.preventDefault()
        
        const payload = {
            data:{from,
            to,
            remarks},
            requestId: existingRequest ? existingRequest.id : null
        }
        method === "post" ?
            dispatch(postRequest(payload.data))
                .unwrap()
                .then(promiseResult => {
                    const [result, error] = promiseResult
                    promiseHandler(error);

                })
            :
            dispatch(patchRequest(payload))
                .unwrap()
                .then(promiseResult => {
                    const [result, error] = promiseResult
                    promiseHandler(error);

                })
    }

    const promiseHandler = (error) => {
        if (!error) {

            setMessage("Request Sent")
            setMessageSeverity("success")
            setMessageVisibility("flex")


        } else if(error.data.message) {

            setMessage("oops!! Something Went Wrong, Cannot request leave")
            setMessageSeverity("warning")
            setMessageVisibility("flex")

        } else {
            setMessage("cannot update current request")
            setMessageSeverity("warning")
            setMessageVisibility("flex")
        }
        setTimeout(() => {
            setMessage("")
            setMessageSeverity("info")
            setMessageVisibility("none")
        }, 5000)
    }

    return (
        <>
            <IconButton onClick={() => history.push('/requests')}>
                <KeyboardReturn />
            </IconButton>
            <Message values={{
                severity: messageSeverity,
                title: message, message: ""
            }}
                display={messageVisibility} />
            <form onSubmit={(event) => {
                handleSubmit(event);
            }}>
                <Stack direction="row" sx={{
                    padding: 4
                }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="From"
                            value={from}
                            onChange={(newValue) => {
                                setFrom(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="To"
                            value={to}
                            onChange={(newValue) => {
                                setTo(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Stack>

                <TextField
                    margin="normal"
                    id="remarks"
                    name="Remarks"
                    label="Reason"
                    value={remarks}
                    multiline
                    rows="5"
                    onChange={(event) => {
                        setRemarks(event.target.value);
                    }}
                    sx={{
                        mx: 4,
                        width: 0.5
                    }}
                />
                <Button
                    variant="contained"
                    type="submit"
                    sx={{
                        m: 2
                    }}
                >
                    Send
                </Button>
            </form>
        </>
    );
};


export default RequestForm;
