import { Play, Pause, Volume2, Maximize2, Layout, SkipForward, SkipBack, Settings2 } from 'lucide-react';
import { parseDuration } from '../utils/videoHelpers';
import styles from '../CrmefVideosPage.module.scss';

export default function VideoControls({ isPlaying, isMuted, isFullscreen, canPrev, canNext, currentTime, duration, volume, playbackRate, onPlayPause, onPrev, onNext, onToggleMute, onToggleFullscreen, onTogglePiP, onSeek, onRateChange, onVolumeChange }) {
  return (
    <>
      <div className={styles.controlRow}>
        <button type="button" onClick={onPlayPause} className={styles.controlButton} aria-label={isPlaying ? 'Pause video' : 'Play video'}>
          {isPlaying ? <Pause size={18} /> : <Play size={18} />} {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button type="button" onClick={onPrev} disabled={!canPrev} className={styles.controlButton} aria-label="Previous lesson">
          <SkipBack size={18} /> Prev
        </button>
        <button type="button" onClick={onNext} disabled={!canNext} className={styles.controlButton} aria-label="Next lesson">
          Next <SkipForward size={18} />
        </button>
        <button type="button" onClick={onToggleMute} className={styles.controlButton} aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}>
          <Volume2 size={18} /> {isMuted ? 'Unmute' : 'Mute'}
        </button>
        <button type="button" onClick={onToggleFullscreen} className={styles.controlButton} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>
          <Maximize2 size={18} /> {isFullscreen ? 'Exit' : 'Fullscreen'}
        </button>
        <button type="button" onClick={onTogglePiP} className={styles.controlButton} aria-label="Toggle picture in picture">
          <Layout size={18} /> PiP
        </button>
      </div>

      <div className={styles.rangeRow}>
        <input type="range" min="0" max={duration || 100} value={currentTime} onChange={onSeek} className={styles.progressSlider} />
        <span className={styles.timecode}>{parseDuration(currentTime)} / {parseDuration(duration)}</span>
      </div>

      <div className={styles.settingsRow}>
        <div className={styles.speedControl}>
          <label htmlFor="playbackRate">Speed</label>
          <select id="playbackRate" value={playbackRate} onChange={onRateChange} className={styles.selectControl}>
            {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
              <option key={rate} value={rate}>{rate}x</option>
            ))}
          </select>
        </div>
        <div className={styles.volumeControl}>
          <label htmlFor="volume">Volume</label>
          <input id="volume" type="range" min="0" max="1" step="0.05" value={volume} onChange={onVolumeChange} className={styles.volumeSlider} />
        </div>
        <button type="button" className={styles.controlButton} disabled>
          <Settings2 size={18} /> Advanced
        </button>
      </div>
    </>
  );
}
