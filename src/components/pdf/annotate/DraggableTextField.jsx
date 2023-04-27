import React, { useState } from 'react';

const DraggableTextField = ({ pageWidth, pageHeight, top, left }) => {
  const [position, setPosition] = useState({ x: left, y: top });
  const [text, setText] = useState('');

  const handleMouseDown = (event) => {
    const startX = event.pageX - position.x;
    const startY = event.pageY - position.y;

    const handleMouseMove = (event) => {
      setPosition({
        x: event.pageX - startX,
        y: event.pageY - startY
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handleMouseMove);
    });
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const styles = {
    position: 'absolute',
    top: position.y,
    left: position.x
  };

  const inputStyles = {
    width: '100%',
    padding: '5px',
    boxSizing: 'border-box',
    fontSize: '16px',
    fontFamily: 'Arial',
    lineHeight: '1.5',
    border: '2px solid #ccc',
    borderRadius: '4px',
    outline: 'none'
  };

  return (
    <div style={styles} onMouseDown={handleMouseDown}>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        style={inputStyles}
        placeholder="Type here"
      />
    </div>
  );
};

export default DraggableTextField;
