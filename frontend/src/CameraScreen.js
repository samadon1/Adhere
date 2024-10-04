import React, { useRef, useState, useEffect } from 'react';

const CameraScreen = ({ onCapture }) => {
  const videoRef = useRef(null);
  const [capturing, setCapturing] = useState(false);

  useEffect(() => {
    // Request camera access and stream the video to the video element
    const startCamera = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error("Error accessing camera: ", error);
        }
      } else {
        alert("Camera access is not supported by this browser.");
      }
    };

    startCamera();

    return () => {
      // Stop the camera stream on component unmount
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    const imageUrl = canvas.toDataURL('image/png');
    onCapture(imageUrl);  // Send the captured image back to the parent component
    setCapturing(false);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <video ref={videoRef} style={{ width: '100%', maxHeight: '300px' }} autoPlay />
      <button onClick={captureImage}>Capture Image</button>
    </div>
  );
};

export default CameraScreen;
