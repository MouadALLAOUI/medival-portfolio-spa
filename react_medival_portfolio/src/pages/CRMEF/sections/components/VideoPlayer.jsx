import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Play, Pause, Volume2, Maximize2, Layout, SkipForward, SkipBack, Settings2 } from 'lucide-react';
import { isYouTubeUrl, parseDuration } from '../utils/videoHelpers';
import useYouTubePlayer from '../hooks/useYouTubePlayer';
import styles from '../CrmefVideosPage.module.scss';

const VideoPlayer = ({
    video,
    savedProgress,
    playbackRate,
    onPlaybackRateChange,
    onSaveProgress,
    onEnded,
    onPrevVideo,
    onNextVideo,
    canPrev,
    canNext,
}) => {
    const videoRef = useRef(null);
    const frameRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(savedProgress?.currentTime || 0);
    const [duration, setDuration] = useState(savedProgress?.duration || 0);
    const [volume, setVolume] = useState(0.9);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const isYouTube = useMemo(() => isYouTubeUrl(video?.url), [video]);

    const { containerRef: ytContainerRef, playerRef: ytPlayerRef } = useYouTubePlayer({
        url: video?.url,
        playbackRate,
        onReady: (player) => {
            if (savedProgress?.currentTime) {
                player.seekTo(savedProgress.currentTime, true);
            }
        },
        onProgress: (time, videoDuration) => {
            setCurrentTime(time);
            setDuration(videoDuration);
            onSaveProgress(video.id, time, videoDuration);
        },
        onEnded: onEnded,
        onError: (ev) => {
            console.warn('YouTube player error', ev);
            setVideoError(true);
        },
    });

    useEffect(() => {
        if (!videoRef.current || !video || isYouTube) return;
        const element = videoRef.current;
        element.volume = volume;
        element.muted = isMuted;
        element.playbackRate = playbackRate;

        const handleLoadedMetadata = () => {
            setDuration(element.duration);
            setVideoError(false);
            if (savedProgress?.currentTime) {
                element.currentTime = savedProgress.currentTime;
            }
        };

        const handleTimeUpdate = () => {
            setCurrentTime(element.currentTime);
            onSaveProgress(video.id, element.currentTime, element.duration);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            onEnded?.();
        };

        const handleError = () => {
            console.warn('Video element error', video);
            setVideoError(true);
        };

        element.addEventListener('loadedmetadata', handleLoadedMetadata);
        element.addEventListener('timeupdate', handleTimeUpdate);
        element.addEventListener('ended', handleEnded);
        element.addEventListener('error', handleError);

        return () => {
            element.removeEventListener('loadedmetadata', handleLoadedMetadata);
            element.removeEventListener('timeupdate', handleTimeUpdate);
            element.removeEventListener('ended', handleEnded);
            element.removeEventListener('error', handleError);
        };
    }, [video, savedProgress, playbackRate, volume, isMuted, isYouTube, onSaveProgress]);

    useEffect(() => {
        if (isPlaying && videoRef.current && !isYouTube) {
            videoRef.current.play().catch(() => setIsPlaying(false));
        }
    }, [isPlaying, isYouTube]);

    useEffect(() => {
        setVideoError(false);
    }, [video?.id]);

    useEffect(() => {
        setCurrentTime(savedProgress?.currentTime || 0);
        setDuration(savedProgress?.duration || 0);
        setIsPlaying(false);
    }, [video?.id, savedProgress]);

    const handlePlayPause = () => {
        if (isYouTube) {
            const player = ytPlayerRef.current;
            if (!player) return;
            if (isPlaying) {
                player.pauseVideo();
                setIsPlaying(false);
            } else {
                player.playVideo();
                setIsPlaying(true);
            }
            return;
        }

        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleSeek = (event) => {
        const nextTime = Number(event.target.value);
        if (isYouTube && ytPlayerRef.current) {
            ytPlayerRef.current.seekTo(nextTime, true);
        } else if (videoRef.current) {
            videoRef.current.currentTime = nextTime;
        }
        setCurrentTime(nextTime);
        onSaveProgress(video.id, nextTime, duration);
    };

    const handleRateChange = (event) => {
        const rate = Number(event.target.value);
        onPlaybackRateChange(rate);
        if (videoRef.current && !isYouTube) {
            videoRef.current.playbackRate = rate;
        }
    };

    const handleVolumeChange = (event) => {
        const nextVolume = Number(event.target.value);
        setVolume(nextVolume);
        if (videoRef.current) {
            videoRef.current.volume = nextVolume;
        }
    };

    const handleFullscreenToggle = () => {
        const root = frameRef.current || videoRef.current;
        if (!root) return;
        if (!document.fullscreenElement) {
            root.requestFullscreen?.();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handlePictureInPicture = async () => {
        try {
            if (!videoRef.current) return;
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
            } else {
                await videoRef.current.requestPictureInPicture();
            }
        } catch (error) {
            console.warn('Picture-in-Picture unavailable', error);
        }
    };

    return (
        <div className={styles.playerCard} ref={frameRef}>
            <div className={styles.videoFrame}>
                {isYouTube ? (
                    videoError ? (
                        <div className={styles.videoError}>
                            <p>Unable to load YouTube content. Try again or open it directly on YouTube.</p>
                            <div className={styles.videoErrorActions}>
                                <button type="button" onClick={() => setVideoError(false)}>Retry</button>
                                <a href={video.url} target="_blank" rel="noreferrer">Open on YouTube</a>
                            </div>
                        </div>
                    ) : (
                        <div ref={ytContainerRef} className={styles.youtubeContainer} />
                    )
                ) : (
                    <>
                        {videoError ? (
                            <div className={styles.videoError}>
                                <p>Unable to load the video. Please check your connection or try again.</p>
                                <div>
                                    <button type="button" onClick={() => { setVideoError(false); videoRef.current?.load(); videoRef.current?.play?.(); }}>Retry</button>
                                </div>
                            </div>
                        ) : (
                            <video
                                ref={videoRef}
                                className={styles.nativeVideo}
                                controls={false}
                                src={video.url}
                                poster={video.poster}
                                playsInline
                            />
                        )}
                    </>
                )}
            </div>

            <div className={styles.controlRow}>
                <button type="button" onClick={handlePlayPause} className={styles.controlButton} aria-label={isPlaying ? 'Pause video' : 'Play video'}>
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />} {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button type="button" onClick={onPrevVideo} disabled={!canPrev} className={styles.controlButton} aria-label="Previous lesson">
                    <SkipBack size={18} /> Prev
                </button>
                <button type="button" onClick={onNextVideo} disabled={!canNext} className={styles.controlButton} aria-label="Next lesson">
                    Next <SkipForward size={18} />
                </button>
                <button type="button" onClick={() => setIsMuted((value) => !value)} className={styles.controlButton} aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}>
                    <Volume2 size={18} /> {isMuted ? 'Unmute' : 'Mute'}
                </button>
                <button type="button" onClick={handleFullscreenToggle} className={styles.controlButton} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>
                    <Maximize2 size={18} /> {isFullscreen ? 'Exit' : 'Fullscreen'}
                </button>
                <button type="button" onClick={handlePictureInPicture} className={styles.controlButton} aria-label="Toggle picture in picture">
                    <Layout size={18} /> PiP
                </button>
            </div>

            <div className={styles.rangeRow}>
                <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className={styles.progressSlider}
                />
                <span className={styles.timecode}>{parseDuration(currentTime)} / {parseDuration(duration)}</span>
            </div>

            <div className={styles.settingsRow}>
                <div className={styles.speedControl}>
                    <label htmlFor="playbackRate">Speed</label>
                    <select id="playbackRate" value={playbackRate} onChange={handleRateChange} className={styles.selectControl}>
                        {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
                            <option key={rate} value={rate}>{rate}x</option>
                        ))}
                    </select>
                </div>
                <div className={styles.volumeControl}>
                    <label htmlFor="volume">Volume</label>
                    <input id="volume" type="range" min="0" max="1" step="0.05" value={volume} onChange={handleVolumeChange} className={styles.volumeSlider} />
                </div>
                <button type="button" className={styles.controlButton} disabled>
                    <Settings2 size={18} /> Advanced
                </button>
            </div>
        </div>
    );
};

export default React.memo(VideoPlayer);
