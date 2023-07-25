import React, { useEffect } from "react";
import Accordion from "../Accordion";
import { connect } from "react-redux";
import { fetchData } from "../../redux/actions/someActions";

const Settings = ({ data, loading, error, fetchData }) => {
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(data);
  return (
    <div className="pdfEditor">
      <h1>Settings</h1>
      <p>Data: {JSON.stringify(data)}</p>
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

const mapStateToProps = (state) => ({
  data: state.someReducer.data,
  loading: state.someReducer.loading,
  error: state.someReducer.error,
});

const mapDispatchToProps = {
  fetchData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
