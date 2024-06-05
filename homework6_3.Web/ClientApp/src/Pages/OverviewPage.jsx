import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Paper } from '@mui/material';

const OverviewPage = () => {
    const [income, setIncome] = useState(0);
    const [maaser, setMaaser] = useState(0);
    const maaserObl = income * .1;
    const maaserLeft = maaserObl - maaser;
    useEffect(() => {
        getIncome();
        getMaaser();
    }, []);

    const getIncome = async() => {
        const { data } = await axios.get('/api/income/gettotal');
        setIncome(data);
    }

    const getMaaser = async () => {
        const { data } = await axios.get('/api/maaser/gettotal');
        setMaaser(data);
    }
    return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        textAlign: 'center'
      }}
    >
      <Paper elevation={3} sx={{ padding: '120px', borderRadius: '15px' }}>
        <Typography variant="h2" gutterBottom>
          Overview
        </Typography>
        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="h5" gutterBottom>
                        Total Income: ${income}
          </Typography>
          <Typography variant="h5" gutterBottom>
                        Total Maaser: ${maaser}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" gutterBottom>
                        Maaser Obligated: ${maaserObl}
          </Typography>
          <Typography variant="h5" gutterBottom>
                        Remaining Maaser obligation: ${maaserLeft}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default OverviewPage;
