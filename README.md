# 🎤📹 Audio & Video Recorder App

A simple React web application that allows users to record audio or video directly in the browser, preview it, download it, and play previously recorded files.

## 🚀 Live Demo

👉 [Check the Live App on Netlify](https://your-deployed-link.netlify.app)

## 📦 Features

- 🎙️ **Audio Recorder**
  - Record audio using your microphone
  - Preview the recording
  - Download audio in `.webm` format

- 🎥 **Video Recorder**
  - Record video using your webcam + mic
  - Live camera preview while recording
  - Playback and download video in `.webm` format

- 🗃️ **Playback Previous Recordings**
  - Stores recordings in browser `localStorage`
  - Replay previous audio and video
  - Download again if needed

- 🔄 **Mode Toggle**
  - Switch between Audio and Video mode with a button

- 🧠 **Permission Handling**
  - Gracefully handles denial of mic/camera permissions

## 🛠️ Tech Stack

- React.js
- JavaScript (MediaRecorder API)
- CSS (custom)

## 🧪 How to Run Locally

```bash
git clone https://github.com/your-username/audio-video-recorder-app.git
cd audio-video-recorder-app
npm install
npm start
