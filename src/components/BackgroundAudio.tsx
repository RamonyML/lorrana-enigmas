import React, { useEffect, useRef } from 'react';

const BackgroundAudio: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3; // Volume mais baixo
      audio.loop = true;
      
      // Tentar tocar o áudio quando o usuário interagir com a página
      const playAudio = () => {
        audio.play().catch(error => {
          console.log('Audio autoplay blocked:', error);
        });
      };

      // Eventos para tentar tocar o áudio
      document.addEventListener('click', playAudio, { once: true });
      document.addEventListener('keydown', playAudio, { once: true });
      document.addEventListener('touchstart', playAudio, { once: true });

      return () => {
        document.removeEventListener('click', playAudio);
        document.removeEventListener('keydown', playAudio);
        document.removeEventListener('touchstart', playAudio);
      };
    }
  }, []);

  return (
    <audio ref={audioRef} preload="auto">
      <source src="/song/song.mp3" type="audio/mpeg" />
      Seu navegador não suporta áudio.
    </audio>
  );
};

export default BackgroundAudio; 