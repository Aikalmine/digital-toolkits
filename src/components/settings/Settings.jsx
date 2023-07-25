import React from "react";
import Accordion from "../Accordion";

const Settings = () => {
  return (
    <div className="pdfEditor">
      <h1>Settings</h1>
      <div className="container mt-5">
        <h1>My Accordion Example</h1>
        <Accordion title="Section 1">
          <p>This is the content of section 1.</p>
        </Accordion>
        <Accordion title="Section 2">
          <p>This is the content of section 2.</p>
        </Accordion>
      </div>
    </div>
  );
};

export default Settings;
