import React from 'react';

const Background = ({ imageUrl }) => {
  const backgroundStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.95, // Opacidade de 50%
    zIndex: -1, // Coloca o fundo atrás do conteúdo
  };

  return <div style={backgroundStyle}></div>;
};

export default Background;
