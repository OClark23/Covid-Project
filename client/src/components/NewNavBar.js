import React, { Component, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../context/userContext';
//
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@emotion/react';
import { useHistory } from 'react-router-dom';
import Wave from "react-wavify";
import './NewNavBar.css'

export default function NewNavBar() {
    const {userInfo, setUserInfo} = useContext(UserContext)
    let history = useHistory()
    const handleSignOut = () => {
    localStorage.removeItem('name', 'email');
    setUserInfo({name: '', email: ''})
    history.push('/')

    }

    const handleLogin = () => {
        history.push('/Login')
    
        }

        const handleRegister = () => {
            history.push('/SignUp')
        
            }
            const handleHome = () => {
                history.push('/')
                }

                const handleExams = () => {
                    history.push('/items')
                
                    }

                    
                    const handleAddExam = () => {
                        history.push('/item/create')
                    
                        }

                        

                        

    const theme = createTheme({
        typography: {
          h6: {
           fontFamily: '"PT Sans", sans-serif',
           fontWeight:"bold",
          fontSize:"20px"
          }
        },
        Button: {
            fontFamily: '"PT Sans", sans-serif',
            fontWeight:"bold",
          fontSize:"20px"
        }
      })


if(!userInfo.email){
  return (
    <div>
      
    <Box sx={{ flexGrow: 1 }}>
      <AppBar  style={{ backgroundColor:"#e34c67" }} position="static">
        <Toolbar>
        
          <ThemeProvider theme={theme}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hack.Diversity Covid Project
          </Typography>
          <Button style={{ fontWeight:"bold",  fontSize:"15px", fontFamily: '"PT Sans", sans-serif'}} sx={{ flexGrow: 1 }} color="inherit" onClick={handleHome}>Home</Button>
          <Button style={{ fontWeight:"bold",   fontSize:"15px", fontFamily: '"PT Sans", sans-serif'}}  sx={{ flexGrow: 1 }} color="inherit" onClick={handleLogin} >Login</Button>
          <Button style={{ fontWeight:"bold",  fontSize:"15px", fontFamily: '"PT Sans", sans-serif'}} sx={{ flexGrow: 1 }} color="inherit"onClick={handleRegister} >SignUp</Button>
          </ThemeProvider>
          
        </Toolbar>
      </AppBar>
    </Box>
    <div className="header-nav">
       

        <div className="wave-overlap3">
          <Wave
            fill="#FA7268"
            paused={false}
            options={{
              height: 110,
              amplitatude: 40,
              speed: 0.2,
              points: 4,
            }}
          />
        </div>

        <div className="wave-overlap4">
          <Wave
            fill="#e34c67"
            paused={false}
            options={{
              height: 140,
              amplitatude: 40,
              speed: 0.1,
              points: 4,
            }}
          />
        </div>
      </div>

    </div>
  )}
  return(
    <div>
    <Box sx={{ flexGrow: 1 }}>
    <AppBar  style={{ backgroundColor:"#e34c67" }} position="static">
      <Toolbar>
      
        <ThemeProvider theme={theme}>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Hack.Diversity Covid Project
        </Typography>
       
        <Button style={{ fontWeight:"bold",  fontSize:"15px", fontFamily: '"PT Sans", sans-serif'}} sx={{ flexGrow: 1 }} color="inherit"onClick={handleExams}>Exam Info</Button>
        <Button  style={{ fontWeight:"bold",  fontSize:"15px", fontFamily: '"PT Sans", sans-serif'}} sx={{ flexGrow: 1 }} color="inherit" onClick={handleAddExam}>Add Exam</Button>
        <Button  style={{ fontWeight:"bold",  fontSize:"15px", fontFamily: '"PT Sans", sans-serif'}} sx={{ flexGrow: 1 }} color="inherit" onClick={handleSignOut}>Sign out</Button>
        </ThemeProvider>
        
      </Toolbar>
    </AppBar>
  </Box>
  <div className="header-nav">
       

       <div className="wave-overlap3">
         <Wave
           fill="#FA7268"
           paused={false}
           options={{
             height: 110,
             amplitatude: 40,
             speed: 0.2,
             points: 4,
           }}
         />
       </div>

       <div className="wave-overlap4">
         <Wave
           fill="#e34c67"
           paused={false}
           options={{
             height: 140,
             amplitatude: 40,
             speed: 0.1,
             points: 4,
           }}
         />
       </div>
     </div>

  </div>
  )

}