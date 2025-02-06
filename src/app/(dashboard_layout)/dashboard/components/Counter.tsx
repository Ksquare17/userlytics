"use client"
import React, { useState, useEffect } from 'react';
import { Button, Container, Stack, Typography } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import PageContainer from "../../container/PageContainer";
import DashboardCard from "../../shared/DashboardCard";

const Counter: React.FC = () => {
  // Initial count state
  const [count, setCount] = useState<number>(() => {
    // Check if there's a saved count in localStorage
    const savedCount = localStorage.getItem('counter');
    return savedCount ? JSON.parse(savedCount) : 0;
  });

  // Spring animation for background color change
  const { backgroundColor } = useSpring({
    backgroundColor: `rgb(${Math.max(Math.min(count * 5, 255), 0)}, ${Math.max(255 - Math.abs(count * 5), 0)}, 190)`, 
    // Ensure RGB values stay within valid range (0 - 255)
    config: { 
      tension: 200, 
      friction: 15,
      easing: (t: number) => {
        // Apply custom bezier-like easing function
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * (t - 1)) * (2 * (t - 1)) + 1;
      }
    },
  });

  // Increment, decrement, and reset functions
  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem('counter', JSON.stringify(newCount)); // Save count to localStorage
  };

  const decrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    localStorage.setItem('counter', JSON.stringify(newCount)); // Save count to localStorage
  };

  const reset = () => {
    setCount(0);
    localStorage.setItem('counter', JSON.stringify(0)); // Reset count to 0 in localStorage
  };

  return (
  
      <DashboardCard title="Counter">
     
      <animated.div
        style={{
          backgroundColor,
          height: '50vh', // Full screen background color
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          Counter: {count}
        </Typography>
        <Stack sx={{display:'flex', flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap'}}>
        <Button variant="contained" color="primary" onClick={increment} sx={{ margin: '10px' }}>
          Increment
        </Button>
        <Button variant="contained" color="secondary" onClick={decrement} sx={{ margin: '10px' }}>
          Decrement
        </Button>
        <Button variant="contained" color="error" onClick={reset} sx={{ margin: '10px' }}>
          Reset
        </Button>
        </Stack>
      </animated.div>
     
        
        </DashboardCard>
   
  );
};

export default Counter;
