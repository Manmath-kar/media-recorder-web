import React, { useEffect, useRef, useState } from 'react';
import '../App.css'

function VideoRecorder() {
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);

  const saveToLocalStorage = (blobUrl) => {
    const existing = JSON.parse(localStorage.getItem('videoRecordings') || '[]');
    const updated = [...existing, { url: blobUrl }];
    localStorage.setItem('videoRecordings', JSON.stringify(updated));
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    streamRef.current = stream;
    videoRef.current.srcObject = stream;

    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (e) => chunksRef.current.push(e.data);
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setVideoURL(url);
      saveToLocalStorage(url);
      chunksRef.current = [];
    };
    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    streamRef.current.getTracks().forEach(track => track.stop());
    setRecording(false);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="recorder">
      <video ref={videoRef} autoPlay muted width={400}></video>
      <div>
        <button onClick={recording ? stopRecording : startRecording}>
          {recording ? 'Stop Recording' : 'Start Recording'}
        </button>
      </div>
      {videoURL && (
        <div>
          <video src={videoURL} controls width={400}></video>
          <a href={videoURL} download="recording.webm">Download</a>
        </div>
      )}
    </div>
  );
}

export default VideoRecorder;