import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Info = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add state for errors

  useEffect(() => {
    if (!eventId) { // Check if eventId is defined before fetching
      setError('Event ID not found');
      setLoading(false);
      return; // Exit useEffect if no eventId
    }

    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tickets/${eventId}`);
        setEventDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setError(error); // Update error state
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  console.log('Event ID:', eventId);
  console.log('Loading:', loading);
  console.log('Error:', error);

  return (
    <div>
      {error ? (
        <p>Error: {error.message}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Event Details</h2>
          <p>Event ID: {eventId}</p>
          {eventDetails && (
            <>
              <p>Event Name: {eventDetails.eventName}</p>
              <p>Location: {eventDetails.eventLocation}</p>
              <p>Price: {eventDetails.price}</p>
              {/* Add more fields as needed */}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Info;