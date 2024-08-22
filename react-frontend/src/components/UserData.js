import React, { useEffect, useState } from 'react';

function UserData() {
  const [interactionData, setInteractionData] = useState({
    mouseMoves: [],
    keyPresses: [],
    windowSize: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setInteractionData(prevData => ({
        ...prevData,
        mouseMoves: [...prevData.mouseMoves, { x: e.clientX, y: e.clientY }]
      }));
    };

    const handleKeyDown = (e) => {
      setInteractionData(prevData => ({
        ...prevData,
        keyPresses: [...prevData.keyPresses, e.key]
      }));
    };

    const handleResize = () => {
      setInteractionData(prevData => ({
        ...prevData,
        windowSize: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      }));
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const sendDataToBackend = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/interactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(interactionData),
      });

      const result = await response.json();
      console.log('Server response:', result);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  return (
    <section>
      <h2>User Interaction Data</h2>
      <p>Move your mouse, press any key, or resize the window to collect data.</p>
      <button onClick={sendDataToBackend}>Send Data to Backend</button>
    </section>
  );
}

export default UserData;
