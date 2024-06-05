import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageSourcesPage = () => {
    const [sources, setSources] = useState([]);

    useEffect(() => {
        getSources();
    }, [])

    const getSources = async() => {
        const { data } = await axios.get('/api/source/getall');
        setSources(data);
    }
  const [open, setOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState('');
  const [editingSource, setEditingSource] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(0);

  const handleOpen = (source = '') => {
    setOpen(true);
    setSelectedSource(source.name);
      setEditingSource(source.name);
      setSelectedId(source.id);
    
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSource('');
    setEditingSource(null);
  };

  const handleAddEdit = async() => {
    if (editingSource) {
        await axios.post('/api/source/updatesource', { name: selectedSource, id: selectedId })
        
    } else {
        await axios.post('/api/source/addsource', { name: selectedSource })
        
    }
      getSources();
    handleClose();
  };

  const handleDelete = (source) => {
      setConfirmOpen(true);
      setSelectedSource(source.name);
      setSelectedId(source.id);
  };

    const handleConfirmClose = async() => {
        await axios.post('/api/source/deletesource', {name:selectedSource, id: selectedId})
        setConfirmOpen(false);
        getSources();
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <Button onClick={() => handleOpen()} variant="contained" color="primary" sx={{ minWidth: '200px' }}>
          Add Source
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
              <TableCell align="right" sx={{ fontSize: '18px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sources.map((source) => (
              <TableRow key={source.id}>
                <TableCell sx={{ fontSize: '18px' }}>{source.name}</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>
                  <Button color="primary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => handleOpen(source)}>Edit</Button>
                        <Button color="secondary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => handleDelete(source)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{editingSource ? 'Edit Source' : 'Add Source'}</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Source" type="text" fullWidth value={selectedSource} onChange={(e) => setSelectedSource(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddEdit} color="primary">
            {editingSource ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmOpen} onClose={handleConfirmClose} fullWidth maxWidth="sm">
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            This source has some income associated with it, are you sure you want to delete it?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmClose} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
    </Container>
  );
}

export default ManageSourcesPage;
