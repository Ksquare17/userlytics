"use client"; 
import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

import { Button, Container, Typography, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { updateUser } from '@/app/store/UserSlice';
import toast, { Toaster } from 'react-hot-toast';

const UserDataEditor: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users); 
  
  const [selectedUserId, setSelectedUserId] = useState<string>(''); 
  const [editorContent, setEditorContent] = useState<string>(''); 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null); 

  const user = users.find((u) => u.id === selectedUserId); 

  const handleUserSelect = (e: SelectChangeEvent) => {
    const selectedId = e.target.value;
    setSelectedUserId(selectedId);
    const selectedUser = users.find((user) => user.id === selectedId);
    if (selectedUser) {
      setEditorContent(selectedUser.html || ''); 
    } else {
      setEditorContent(''); 
    }
  };

  const handleEditorChange = (value: string) => {
    setEditorContent(value); 
  };

  const handleSave = () => {
    if (user) {
      const updatedUser = { ...user, html: editorContent }; 
      dispatch(updateUser(updatedUser)); 
      localStorage.setItem('users', JSON.stringify(users)); 
      toast.success('Operation Successful', {
        style: {
          border: '1px solid #2e7d32', 
          padding: '16px',
          color: '#2e7d32', 
        },
        iconTheme: {
          primary: '#2e7d32', 
          secondary: '#e8f5e9', 
        },
      });
    }
  };

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users)); 
    }
  }, [users]);

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', padding: '20px' }}>
         <Toaster />
      <Typography variant="h4" component="h1" gutterBottom>
        User Data Editor
      </Typography>

      {/* User Selection Dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="user-select-label">Select User</InputLabel>
        <Select
          labelId="user-select-label"
          value={selectedUserId}
          onChange={handleUserSelect}
          label="Select User"
        >
          {users.length === 0 ? (
            <MenuItem disabled>No users available</MenuItem>
          ) : (
            users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      <ReactQuill
        value={editorContent}
        onChange={handleEditorChange}
        ref={editorRef} 
        modules={{
          toolbar: [
            [{ header: '1' }, { header: '2' }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline'],
           
          ],
        }}
        
      />

      <Button
        type="button"
        variant="contained"
        color="primary"
        sx={{ marginTop: '20px' }}
        onClick={handleSave}
        disabled={!user} 
      >
        Update HTML Content
      </Button>
    </Container>
  );
};

export default UserDataEditor;
