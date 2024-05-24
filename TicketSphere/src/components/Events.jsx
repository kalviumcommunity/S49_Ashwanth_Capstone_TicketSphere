import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import { Modal, Select } from 'antd';
import { SignedIn, useUser } from '@clerk/clerk-react';
import Loader from './loader.jsx'; 
import "./home.css"

const Events = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true); 
  const [minLoadingTime, setMinLoadingTime] = useState(false); 
  const { isSignedIn, user, isLoaded } = useUser();
  
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tickets');
        setTickets(response.data);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setLoading(false); 
      }
    };

    fetchTickets();

    
    const timer = setTimeout(() => {
      setMinLoadingTime(true);
    }, 1250);

    return () => clearTimeout(timer); 
  }, []);

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const filteredTickets = selectedCategory
    ? tickets.filter(ticket => ticket.category === selectedCategory)
    : tickets;

  if (loading || !isLoaded || !minLoadingTime) {
    return <Loader />; 
  }

  return (
    <>
      <h4>‎ ‎ </h4>
      <div style={{ color: "black" }}>
          <h3>Browse all events</h3>
      </div>
      <h6>‎ ‎ </h6>    
      <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
        <Select
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value)}
          style={{ width: 200 }}
          placeholder="Select Category"
        >
          <Select.Option value="">All Categories</Select.Option>
          <Select.Option value="Sports">Sports</Select.Option>
          <Select.Option value="Concert">Concert</Select.Option>
          <Select.Option value="Party">Party</Select.Option>
          <Select.Option value="Standup">Standup</Select.Option>
          <Select.Option value="Movie Night">Movie Night</Select.Option>
          <Select.Option value="Game Night">Game Night</Select.Option>
          <Select.Option value="Food Festival">Food Festival</Select.Option>
        </Select>
      </div>
      <br />
      <motion.div 
        className="event-list"
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }} 
      >
        {filteredTickets.map((ticket, index) => (
          <motion.div
            key={ticket._id}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleOpenModal(ticket)}
          >
            <div className="card">
              <div className="card2">
                {ticket.poster && <img src={ticket.poster} alt={ticket.eventName} className="event-card-image" draggable={false} />}
                <div className="card-content">
                  <h3>{ticket.eventName}</h3>
                  <p>$ {ticket.price}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Modal
  title="Event Details"
  open={isModalVisible}
  onCancel={handleCloseModal}
  footer={
    <div className="modal-footer">
      <Link to={`/event/${selectedEvent._id}`} key="buy" className="fancy buy-tickets-button">
        <span className="top-key"></span>
        <span className="text">Buy Tickets</span>
        <span className="bottom-key-1"></span>
        <span className="bottom-key-2"></span>
      </Link>
    </div>
  }
  className="custom-modal"
>
  {selectedEvent && (
    <>
      <p>Event Name: {selectedEvent.eventName}</p>
      <p>Location: {selectedEvent.eventLocation}</p>
      <p>Category: {selectedEvent.category}</p>
      <p>Price: ${selectedEvent.price}</p>
      <p>Date: {new Date(selectedEvent.date).toLocaleDateString()}</p>
      <p>Listed by: {selectedEvent.sellerName}</p>
    </>
  )}
</Modal>
    </>
  );
};

export default Events;
