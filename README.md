# Birthday Website with Animated Intro

A beautiful animated intro website that plays audio when everything is loaded and automatically scrolls to the main content.

## Features

- 🎨 **Animated Intro**: Beautiful 7-second animation sequence with gradient backgrounds and floating elements
- 🎵 **Audio Playback**: Automatically plays audio when the intro animation completes
- 📱 **Responsive Design**: Works on all screen sizes
- ⚡ **Auto-scroll**: Smoothly transitions to main content after intro
- 🎯 **Skip Option**: Users can skip the intro by clicking anywhere or using the skip button

## Audio Setup

To add your own audio file:

1. **Add your audio file** to the project directory with one of these names:
   - `birthday-audio.mp3` (recommended)
   - `birthday-audio.wav`
   - `birthday-audio.ogg`

2. **Supported formats**:
   - MP3 (most compatible)
   - WAV (high quality)
   - OGG (open source)

3. **Audio specifications**:
   - Recommended duration: 10-30 seconds
   - Volume is automatically set to 70%
   - Audio will not loop

## Browser Compatibility

- **Autoplay**: Modern browsers may block autoplay. If this happens, users will see a "Click anywhere to enable audio" message
- **Audio formats**: The website includes multiple format support for maximum compatibility

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS animations and styling
├── script.js           # JavaScript for animations and audio
├── birthday-audio.mp3  # Your audio file (add this)
└── README.md          # This file
```

## Customization

### Changing the Audio File
Edit the `src` attribute in `index.html` or modify the `initializeAudio()` function in `script.js`:

```javascript
this.audio.src = 'your-audio-file.mp3';
```

### Adjusting Audio Volume
In `script.js`, modify the volume (0.0 to 1.0):

```javascript
this.audio.volume = 0.7; // 70% volume
```

### Changing Animation Duration
In `script.js`, modify the animation duration:

```javascript
this.animationDuration = 7000; // 7 seconds in milliseconds
```

## Usage

1. Add your audio file to the project directory
2. Open `index.html` in a web browser
3. The intro animation will play automatically
4. Audio will start when the loading completes
5. The page will auto-scroll to main content after 7 seconds

## Troubleshooting

### Audio Not Playing
- Check that your audio file exists and has the correct name
- Try clicking on the page to enable audio (browser autoplay restrictions)
- Check browser console for error messages
- Ensure audio file format is supported

### Animation Issues
- Make sure all CSS and JavaScript files are in the same directory
- Check that fonts are loading properly (requires internet connection)
- Verify browser supports modern CSS features

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

Enjoy your animated birthday website! 🎉
