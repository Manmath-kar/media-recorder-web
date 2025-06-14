import React from 'react';
import '../App.css'

function RecordingsList() {
  const audioRecordings = JSON.parse(localStorage.getItem('audioRecordings') || '[]');
  const videoRecordings = JSON.parse(localStorage.getItem('videoRecordings') || '[]');

  return (
    <div className="recordings-container">
      <h2>Previously Recorded Files</h2>

      <div>
        <h3>Audio Recordings</h3>
        {audioRecordings.length === 0 && <p>No audio recordings found.</p>}
        {audioRecordings.map((item, index) => (
          <div key={index} className="recording-item">
            <audio controls src={item.url}></audio>
            <a href={item.url} download={`audio-recording-${index + 1}.webm`}>Download</a>
          </div>
        ))}
      </div>

      <div>
        <h3>Video Recordings</h3>
        {videoRecordings.length === 0 && <p>No video recordings found.</p>}
        {videoRecordings.map((item, index) => (
          <div key={index} className="recording-item">
            <video controls width={300} src={item.url}></video>
            <a href={item.url} download={`video-recording-${index + 1}.webm`}>Download</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecordingsList;