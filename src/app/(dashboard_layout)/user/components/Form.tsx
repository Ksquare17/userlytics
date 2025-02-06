

"use client"; 
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { addUser, updateUser } from '@/app/store/UserSlice';
import toast, { Toaster } from 'react-hot-toast';
 interface PartialUser {
  
  name: string;
  email: string;
  phone: string;
  address: string;
 
}

const validationSchema = Yup.object({
    name: Yup.string()
      .trim() 
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters long'),
    
    email: Yup.string()
      .email('Invalid email address') 
      .required('Email is required'),
    
    phone: Yup.string()
      .matches(/^\d+$/, 'Phone number must be a valid number') 
      .required('Phone number is required'),
    
    address: Yup.string()
      .trim() 
      .required('Address is required')
      .min(2, 'Address must be at least 2 characters long'), 
  });
  

  const UserDataForm: React.FC = () => {
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.user.users);
  
    const [selectedUserId, setSelectedUserId] = useState<string>(''); 
    const [isUnsaved, setIsUnsaved] = useState<boolean>(false);
  
    const user = users.find((u) => u.id === selectedUserId);
  
    const generateHTML = (values: PartialUser): string => {
      return `
        <div>
          <h1>User Profile</h1>
          <p><strong>Name:</strong> ${values.name}</p>
          <p><strong>Email:</strong> ${values.email}</p>
          <p><strong>Phone:</strong> ${values.phone}</p>
          <p><strong>Address:</strong> ${values.address}</p>
        </div>
      `;
    };
  
    const formik = useFormik({
      initialValues: {
        id: user ? user.id : uuidv4(),
        name: user ? user.name : '',
        email: user ? user.email : '',
        phone: user ? user.phone : '',
        address: user ? user.address : '',
        html: user ? user.html : '',
        createdAt: user ? user.createdAt : '',
      },
      validationSchema,
      onSubmit: (values) => {
        const htmlContent = generateHTML(values);
        const creationTime = user ? user.createdAt : new Date().toISOString();
        const userDataWithHTML = { ...values, html: htmlContent, createdAt: creationTime };
  
        if (user) {
          dispatch(updateUser(userDataWithHTML)); 
        } else {
          dispatch(addUser(userDataWithHTML)); 
        }
 
  
        localStorage.setItem('users', JSON.stringify(users)); 
        setIsUnsaved(false); 
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
          
          
        formik.setValues({
            id: uuidv4(),
            name: '',
            email: '',
            phone: '',
            address: '',
            html: '',
            createdAt: '',
          });
      },
    });
  
    useEffect(() => {
      if (user) {
        formik.setValues({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          html: user.html || '',
          createdAt: user.createdAt || '',
        });
      } else {
        formik.setValues({
          id: uuidv4(),
          name: '',
          email: '',
          phone: '',
          address: '',
          html: '',
          createdAt: '',
        });
      }
    }, [selectedUserId, user]); 
  
    const handleUserSelect = (e: SelectChangeEvent) => {
      setSelectedUserId(e.target.value); 
      setIsUnsaved(false); 
    };
    useEffect(() => {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        if (isUnsaved) {
          const message = "You have unsaved changes. Are you sure you want to leave?";
          event.returnValue = message;
          return message; 
        }
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
  
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, [isUnsaved]);
  
   
    const handleFieldChange = () => {
      if (!isUnsaved) {
        setIsUnsaved(true); 
      }
    };
  
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', padding: '20px' }}>
        <Toaster />
        <Typography variant="h4" component="h1" gutterBottom>
          User Data Form
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
            {users.length !== 0 && <MenuItem value="">Create New User</MenuItem>}
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
  
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={(e) => {
              formik.handleChange(e);
              handleFieldChange(); 
            }}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            margin="normal"
          />
  
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={(e) => {
              formik.handleChange(e);
              handleFieldChange(); 
            }}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />
  
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formik.values.phone}
            onChange={(e) => {
              formik.handleChange(e);
              handleFieldChange(); 
            }}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            margin="normal"
          />
  
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formik.values.address}
            onChange={(e) => {
              formik.handleChange(e);
              handleFieldChange(); 
            }}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            margin="normal"
          />
  
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '20px' }}>
            {selectedUserId ? 'Update User' : 'Save User'}
          </Button>
        </form>
      </Container>
    );
  };
  

export default UserDataForm;
