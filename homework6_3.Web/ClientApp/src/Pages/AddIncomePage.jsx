import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Autocomplete, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';



const AddIncomePage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [amount, setAmount] = useState(0);
    const [source, setSource] = useState({});
    const [sources, setSources] = useState([]);
    const navigate = useNavigate();
    

    useEffect(() => {
        getSources();
    }, []);

    const getSources = async () => {
        const { data } = await axios.get('/api/source/getall');
        setSources(data);
    }

    const onAddClick = async () => {
        await axios.post('/api/income/addincome', { amount: amount, date: selectedDate, sourceId: source.id });
        navigate('/income');
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Income
            </Typography>
            <Autocomplete
                value={source.name}
                onChange={(e, newValues) => setSource({ ...newValues })}
                options={sources}
                getOptionLabel={(option) => option.name}
                fullWidth
                margin="normal"
                renderInput={(params) => <TextField {...params} label="Source" variant="outlined" />}
            />
            <TextField
                label="Amount"
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                fullWidth
                margin="normal"
                value={amount}
                onChange={e=> setAmount(e.target.value) }
            />
             <TextField
                label="Date"
                type="date"
                value={dayjs(selectedDate).format('YYYY-MM-DD')}
                onChange={e => setSelectedDate(e.target.value)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
            />
            <Button variant="contained" color="primary" onClick={onAddClick}>Add Income</Button>
        </Container>
    );
}

export default AddIncomePage;
