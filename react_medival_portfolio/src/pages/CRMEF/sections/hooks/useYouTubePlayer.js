import { useEffect, useRef } from 'react';
import { getYouTubeId } from '../utils/videoHelpers';

const loadYouTubeApi = () => new Promise((resolve) => {
    if (window.YT?.Player) {
        resolve(window.YT);
        return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    document.body.appendChild(script);

    window.onYouTubeIframeAPIReady = () => resolve(window.YT);
});

export default function useYouTubePlayer({ url, onReady, onEnded, onProgress, playbackRate, onError }) {
    const playerRef = useRef(null);
    const intervalRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const videoId = getYouTubeId(url);
        if (!videoId || !containerRef.current) return undefined;

        let isMounted = true;
        loadYouTubeApi().then((YT) => {
            if (!isMounted) return;
            if (playerRef.current) {
                playerRef.current.destroy();
            }

            playerRef.current = new YT.Player(containerRef.current, {
                videoId,
                playerVars: {
                    controls: 1,
                    rel: 0,
                    modestbranding: 1,
                    playsinline: 1,
                },
                events: {
                    onReady: (event) => {
                        if (playbackRate) {
                            event.target.setPlaybackRate(playbackRate);
                        }
                        onReady?.(event.target);
                    },
                    onStateChange: (event) => {
                        if (event.data === YT.PlayerState.PLAYING) {
                            intervalRef.current = window.setInterval(() => {
                                const currentTime = event.target.getCurrentTime();
                                const duration = event.target.getDuration();
                                onProgress?.(currentTime, duration);
                            }, 1500);
                        }
                        if (event.data === YT.PlayerState.ENDED) {
                            onEnded?.();
                        }
                        if (event.data !== YT.PlayerState.PLAYING && intervalRef.current) {
                            window.clearInterval(intervalRef.current);
                            intervalRef.current = null;
                        }
                    },
                    onError: (event) => {
                        onError?.(event);
                    },
                },
            });
        });

        return () => {
            isMounted = false;
            if (intervalRef.current) {
                window.clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            if (playerRef.current?.destroy) {
                playerRef.current.destroy();
            }
        };
    }, [url, onReady, onEnded, onProgress, playbackRate]);

    return { containerRef, playerRef };
}
