import React, { useRef, useEffect, useState } from 'react';
import '../styles/Card.css';
import user from "../assets/user.png";
import menu1 from "../assets/menu.png";
const Card = ({ id, title, status, user, priority, tag, img }) => {
  const titleRef = useRef(null);
  const [truncatedTitle, setTruncatedTitle] = useState('');

//   useEffect(() => {
//     const container = titleRef.current;
//     const maxLines = 2;

//     const truncateText = () => {
//       const styles = window.getComputedStyle(container);
//       const lineHeight = parseInt(styles.lineHeight);
//       const maxHeight = lineHeight * maxLines;
      
//       if (container.scrollHeight > maxHeight) {
//         let text = title;
//         while (container.scrollHeight > maxHeight && text.length > 0) {
//           text = text.slice(0, -1);
//           container.textContent = text + '...';
//         }
//         setTruncatedTitle(text);
//       }/     };

//     truncateText();
//     window.addEventListener('resize', truncateText);
//     return () => window.removeEventListener('resize', truncateText);
//   }, [title]);

  return (
    <div className="card1">
      <div className="id">
        <div>{id}</div>
        <div className='icon'>
          <img src={img} style={{ height: "1.2rem" }} />
        </div>
      </div>

      <div className="title" ref={titleRef}>
      <span className="truncate">{title}</span>
      </div>
      <div className="tags">   <img src={menu1} style={{height:"0.95rem",marginLeft:"0.5rem"}}/>    <ul>
     
        <li className='list' >
         
          
           <div style={{marginLeft:"-0.35rem"}}> {tag[0]}</div>
         
           
            </li>
        </ul>
        </div>
    </div>
  );
};

export default Card;
