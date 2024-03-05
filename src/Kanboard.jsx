import React, { useState, useEffect } from 'react';
import './Kanboard.css';
import user from "./assets/user.png";
import user1 from "./assets/user.png";
import user2 from "./assets/user.png";
import user3 from "./assets/user.png";
import user4 from "./assets/user.png";
import user5 from "./assets/user.png";
import user6 from "./assets/user.png";
import user7 from "./assets/user.png";
import user8 from "./assets/user.png";
import user9 from "./assets/user.png";

import Card from './Card';
function KanbanBoard() {
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortingOption, setSortingOption] = useState('priority');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setTickets(data.tickets); // Update state with tickets array from the fetched data
      setUsers(data.users); // Update state with users array from the fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const groupAndSortTickets = () => {
    // Grouping tickets based on the selected option
    let groupedTickets = {};
    tickets.forEach(ticket => {
      const key = ticket[groupingOption];
      if (!groupedTickets[key]) {
        groupedTickets[key] = [];
      }
      groupedTickets[key].push(ticket);
    });

    // Sorting tickets within each group based on the selected option
    for (const group in groupedTickets) {
      groupedTickets[group].sort((a, b) => {
        if (sortingOption === 'priority') {
          return mapPriorityToValue(b.priority) - mapPriorityToValue(a.priority);
        } else if (sortingOption === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    }

    return groupedTickets;
  };
  let val =-1;
  const getUserImage = (index) => {
    val++;
    const images = [
      user, user1, user2, user3, user4, 
      user5, user6, user7, user8, user9
    ]; 
    return images[3];
  };
  
  const mapPriorityToValue = (priority) => {
    switch (priority) {
      case 4:
        return 4;
      case 3:
        return 3;
      case 2:
        return 2;
      case 1:
        return 1;
      default:
        return 0;
    }
  };

  const groupedAndSortedTickets = groupAndSortTickets();

  return (
    <div className="kanban-board">

      {/* Grouping Controls */}
      <div className="controls">
        <label htmlFor="grouping">Group By:</label>
       
        <select id="grouping" value={groupingOption} onChange={(e) => setGroupingOption(e.target.value)}>
          <option value="status">Status</option>
          <option value="userId">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      {/* Sorting Controls */}
      <div className="controls">
        <label htmlFor="sorting">Sort By:</label>
        <select id="sorting" value={sortingOption} onChange={(e) => setSortingOption(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>

      {/* Kanban Board Display */}
      <div className="board">
        {/* Render grouped and sorted ticket cards */}
        {Object.entries(groupedAndSortedTickets).map(([group, ticketsInGroup]) => (
          <div key={group} className="group">
            <h2>{group}</h2>
            {ticketsInGroup.map((ticket,index) => (
              <div key={ticket.id} className="card">
              
                <Card id={ticket.id} title ={ticket.title} status={ticket.status} user={getUserById(users, ticket.userId)} priority={mapValueToPriority(ticket.priority)} tag={ticket.tag} img={getUserImage(index)}/>
                {/* <h3>{ticket.title}</h3>
                <p>Status: {ticket.status}</p>
                <p>User: {getUserById(users, ticket.userId)}</p>
                <p>Priority: {mapValueToPriority(ticket.priority)}</p> */}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper function to get user name by user ID
function getUserById(users, userId) {
  const user = users.find(user => user.id === userId);
  return user ? user.name : 'Unknown';
}

// Helper function to map priority value to priority level
function mapValueToPriority(value) {
  switch (value) {
    case 4:
      return 'Urgent';
    case 3:
      return 'High';
    case 2:
      return 'Medium';
    case 1:
      return 'Low';
    case 0:
      return 'No priority';
    default:
      return 'Unknown';
  }
}

export default KanbanBoard;
