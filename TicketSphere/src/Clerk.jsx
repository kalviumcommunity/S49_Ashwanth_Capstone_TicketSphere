import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, useNavigate } from "react-router-dom";
import App from './App.jsx';
import './index.css';
import { ClerkProvider, RedirectToSignIn, SignIn, SignUp, SignedIn, SignedOut,Protect } from "@clerk/clerk-react";
import SellPage from './components/SellPage.jsx';
import {neobrutalism} from "@clerk/themes";
import EventDetails from './components/EventDetails.jsx';
import Dashboard from './components/dashboard.jsx';
import Navbar from './navbar.jsx';
import Events from './components/Events.jsx';
import Admin from './components/Admin.jsx';
import Sports from './components/sports.jsx';
import Concert from './components/concert.jsx';
import Party from './components/parties.jsx';
import Standup from './components/standup.jsx';
import MovieNight from './components/movie.jsx';
import Games from './components/game.jsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
export  default function ClerkWithRoutes(){
    const navigate = useNavigate()
  
    return(
      <ClerkProvider
      appearance={{
        baseTheme: neobrutalism
      }}
        publishableKey ="pk_test_c3dlZXBpbmctcHVtYS02OS5jbGVyay5hY2NvdW50cy5kZXYk"
        navigate={(to) => navigate(to)}
      >
        <Navbar/>
        <Routes>
        <Route path="/" element={<App />} />
  
        <Route
            path="/sign-in/"
            element={<SignIn routing="path" path="/sign-in" />}
          />
          {/* <Route
            path="/sign-up/*"
            element={<SignUp routing="path" path="/sign-up" />}
          /> */}
  
          <Route
            path="/sellpage"
            element={
              <>
              <SignedIn>
                <SellPage />
              </SignedIn>
               <SignedOut>
                <RedirectToSignIn />
             </SignedOut>
              </>
            }
          />    
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path = "/admin" element= {<Admin/>}/>
          <Route path = "/sports" element= {<Sports/>}/>
          <Route path = "/concerts" element= {<Concert/>}/>
          <Route path = "/party" element= {<Party/>}/>
          <Route path = "/standup" element= {<Standup/>}/>
          <Route path = "/movie" element= {<MovieNight/>}/>
          <Route path = "/games" element= {<Games/>}/>
        </Routes>
        
        
  
      </ClerkProvider>
  
    )
  }