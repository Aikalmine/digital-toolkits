import React, { useState } from "react";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className={`accordion-button ${isOpen ? "" : "collapsed"}`}
            type="button"
            onClick={toggleAccordion}
          >
            {title}
          </button>
        </h2>
        <div
          className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
          aria-labelledby={`heading-${title}`}
          data-bs-parent=".accordion"
        >
          <div className="accordion-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
