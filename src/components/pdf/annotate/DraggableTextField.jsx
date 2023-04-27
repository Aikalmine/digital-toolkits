import React, { useRef, useState } from 'react';
import { useDrag } from 'react-use-gesture';

function DraggableTextField(props) {
  const { top, left } = props;
  const [text, setText] = useState('');
  const ref = useRef();

  const bind = useDrag(({ event, down, movement: [mx, my] }) => {
    if (down) {
      ref.current.style.cursor = 'grabbing';
      ref.current.style.top = `${top + my}px`;
      ref.current.style.left = `${left + mx}px`;
    } else {
      ref.current.style.cursor = 'grab';
      handleTextFieldPositionChange(ref.current.style.top, ref.current.style.left, text);
    }
  });

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleSave = () => {
    props.onSave(text);
  };

  const handleCancel = () => {
    props.onCancel();
  };

  const handleTextFieldPositionChange = (top, left, text) => {
    props.onPositionChange(top, left, text);
  };

  return (
    <div
      className="draggable-text-field"
      ref={ref}
      {...bind()}
      style={{ position: 'absolute', top: `${top}px`, left: `${left}px`, cursor: 'grab' }}
    >
      <input type="text" value={text} onChange={handleInputChange} />
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default DraggableTextField;
