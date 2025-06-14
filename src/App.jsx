import React, { useState } from 'react';
import AudioRecorder from './components/AudioRecorder';
import VideoRecorder from './components/VideoRecorder';
import RecordingsList from './components/RecordingsList';
import './App.css';

function App() {
  const [mode, setMode] = useState('audio');
  const [showRecordings, setShowRecordings] = useState(false);

  return (
    <div className="app">
      <header className="header">
        <h1>Audio & Video Recorder</h1>
        <div className="mode-toggle">
          <button onClick={() => setMode('audio')} className={mode === 'audio' ? 'active' : ''}>Audio</button>
          <button onClick={() => setMode('video')} className={mode === 'video' ? 'active' : ''}>Video</button>
          <button onClick={() => setShowRecordings(prev => !prev)} className="recordings-link">
            {showRecordings ? 'Hide Recordings' : 'Show Recordings'}
          </button>
        </div>
      </header>

      <main>
        {mode === 'audio' ? <AudioRecorder /> : <VideoRecorder />}
        {showRecordings && <RecordingsList />}
      </main>
    </div>
  );
}

export default App;