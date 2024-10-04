import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Camera, Clock, CheckCircle, XCircle, Calendar, Upload, Search } from 'lucide-react';

const App = () => {
  const [page, setPage] = useState('upload');
  const [prescription, setPrescription] = useState(null);
  const [schedule, setSchedule] = useState([
    { id: 1, name: 'Aspirin', time: '08:00', taken: false },
    { id: 2, name: 'Vitamin D', time: '12:00', taken: false },
    { id: 3, name: 'Metformin', time: '20:00', taken: false },
  ]);
  const [currentPill, setCurrentPill] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);

  useEffect(() => {
    const checkSchedule = () => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const dueReminder = schedule.find(item => item.time === currentTime && !item.taken);
      if (dueReminder) {
        toast.info(`Time to take ${dueReminder.name}!`, {
          onClick: () => {
            setPage('verify');
            toast.dismiss();
          }
        });
      }
    };

    const timer = setInterval(checkSchedule, 60000);
    return () => clearInterval(timer);
  }, [schedule]);

  const onUploadPrescription = (event) => {
    const file = event.target.files[0];
    setPrescription(file);
    toast.success('Prescription uploaded successfully!');
    setPage('schedule');
  };

  const onCapturePill = (event) => {
    const file = event.target.files[0];
    setCurrentPill(file);
    verifyPill(file);
  };

  const verifyPill = async (pillImage) => {
    setTimeout(() => {
      const result = Math.random() > 0.5;
      setVerificationResult(result);
      if (result) {
        toast.success('Pill verified successfully!');
      } else {
        toast.error('Pill verification failed. Please check your medication.');
      }
    }, 2000);
  };

  const toggleTaken = (id) => {
    setSchedule(schedule.map(item =>
      item.id === id ? { ...item, taken: !item.taken } : item
    ));
  };

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '400px',
    margin: '20px auto',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    height: '100vh'
  };

  const titleStyle = {
    textAlign: 'center',
    color: '#4a4a4a',
    marginBottom: '30px',
    fontSize: '32px',
    fontWeight: 'bold'
  };

  const tabContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '30px',
    backgroundColor: '#f0f0f0',
    borderRadius: '15px',
    padding: '5px'
  };

  const tabStyle = (isActive) => ({
    padding: '12px 20px',
    backgroundColor: isActive ? '#3f51b5' : 'transparent',
    color: isActive ? 'white' : '#4a4a4a',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: 'bold'
  });

  const contentStyle = {
    textAlign: 'center'
  };

  const headingStyle = {
    color: '#3f51b5',
    marginBottom: '25px',
    fontSize: '24px'
  };

  const iconContainerStyle = {
    width: '180px',
    height: '180px',
    backgroundColor: '#e8eaf6',
    borderRadius: '90px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto 30px',
    boxShadow: '0 5px 15px rgba(63, 81, 181, 0.2)',
    transition: 'all 0.3s ease'
  };

  const buttonStyle = {
    display: 'inline-block',
    padding: '12px 25px',
    backgroundColor: '#3f51b5',
    color: 'white',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: 'none',
    fontWeight: 'bold',
    boxShadow: '0 4px 6px rgba(63, 81, 181, 0.2)'
  };

  const fileInfoStyle = {
    marginTop: '15px',
    color: '#666',
    fontSize: '14px'
  };

  const renderUploadPage = () => (
    <div style={contentStyle}>
      <h2 style={headingStyle}>Upload Your Prescription</h2>
      <div style={iconContainerStyle}>
        <Camera size={80} color="#3f51b5" />
      </div>
      <label style={buttonStyle}>
        Upload Prescription
        <input
          type="file"
          accept="image/*"
          onChange={onUploadPrescription}
          style={{ display: 'none' }}
        />
      </label>
      <p style={fileInfoStyle}>
        {prescription ? prescription.name : 'No file chosen'}
      </p>
    </div>
  );

  const renderSchedulePage = () => (
    <div style={contentStyle}>
      <h2 style={headingStyle}>Today's Schedule</h2>
      {schedule.map((item) => (
        <div key={item.id} style={{
          backgroundColor: '#f5f5f5',
          padding: '20px',
          borderRadius: '15px',
          marginBottom: '15px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '5px' }}>{item.name}</p>
            <p style={{ color: '#666', fontSize: '14px' }}>{item.time}</p>
          </div>
          <button
            onClick={() => toggleTaken(item.id)}
            style={{
              ...buttonStyle,
              backgroundColor: item.taken ? '#4caf50' : '#3f51b5',
              padding: '8px 15px',
              fontSize: '14px'
            }}
          >
            {item.taken ? 'Taken' : 'Take'}
          </button>
        </div>
      ))}
    </div>
  );

  const renderVerifyPage = () => (
    <div style={contentStyle}>
      <h2 style={headingStyle}>Verify Your Pill</h2>
      {!currentPill ? (
        <>
          <div style={iconContainerStyle}>
            <Camera size={80} color="#3f51b5" />
          </div>
          <label style={buttonStyle}>
            Capture Pill
            <input
              type="file"
              accept="image/*"
              onChange={onCapturePill}
              style={{ display: 'none' }}
            />
          </label>
        </>
      ) : (
        <div>
          <img src={URL.createObjectURL(currentPill)} alt="Current pill" style={{
            width: '180px',
            height: '180px',
            objectFit: 'cover',
            borderRadius: '90px',
            margin: '0 auto 30px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
          }} />
          {verificationResult === null ? (
            <p style={{ fontSize: '18px', color: '#666' }}>Verifying...</p>
          ) : (
            <div style={{
              color: verificationResult ? '#4caf50' : '#f44336',
              fontWeight: 'bold',
              fontSize: '24px',
              marginTop: '20px'
            }}>
              {verificationResult ? '✅ Pill Verified' : '❌ Verification Failed'}
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div style={containerStyle}>
      <ToastContainer position="top-center" />
      {/* <h1 style={titleStyle}>v PillPack</h1> */}

      <div style={tabContainerStyle}>
        {['Upload', 'Schedule', 'Verify'].map((tab) => (
          <button
            key={tab}
            onClick={() => setPage(tab.toLowerCase())}
            style={tabStyle(page === tab.toLowerCase())}
          >
            {tab}
          </button>
        ))}
      </div>

      {page === 'upload' && renderUploadPage()}
      {page === 'schedule' && renderSchedulePage()}
      {page === 'verify' && renderVerifyPage()}
    </div>
  );
};

export default App;