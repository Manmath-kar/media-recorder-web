import React, { useRef, useState } from 'react';
import '../App.css'

function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const saveToLocalStorage = (blobUrl) => {
    const existing = JSON.parse(localStorage.getItem('audioRecordings') || '[]');
    const updated = [...existing, { url: blobUrl }];
    localStorage.setItem('audioRecordings', JSON.stringify(updated));
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (e) => chunksRef.current.push(e.data);
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
      saveToLocalStorage(url);
      chunksRef.current = [];
    };
    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
  <div className="recorder-container">
    <h2>🎙️ Audio Recorder</h2>
    <button className={`record-button ${recording ? 'stop' : 'start'}`} onClick={recording ? stopRecording : startRecording}>
      {recording ? '⏹ Stop Recording' : '🎤 Start Recording'}
    </button>

    {audioURL && (
      <div className="preview">
        <audio src={audioURL} controls></audio>
        <a href={audioURL} download="recording.webm" className="download-btn">⬇ Download</a>
      </div>
    )}
  </div>
);

}

export default AudioRecorder;