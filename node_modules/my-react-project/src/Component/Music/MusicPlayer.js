function MusicPlayer() {
    useEffect(() => {
      const isMusicPlaying = localStorage.getItem('isMusicPlaying');
  
      if (!isMusicPlaying) {
        const audio = new Audio('path/to/music.mp3');
        audio.loop = true;
        audio.play();
  
        // Store the flag indicating that the music is playing in localStorage
        localStorage.setItem('isMusicPlaying', true);
  
        // Clean up function to stop the music and remove the flag from localStorage
        return () => {
          audio.pause();
          localStorage.removeItem('isMusicPlaying');
        };
      }
    }, []);
  
    return null;
  }
  