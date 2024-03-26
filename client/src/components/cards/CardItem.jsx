import React, { useState, useEffect } from 'react';


const CardItem = ({ id, imageId, shownCards, cardClicked, source }) => {
  
  const [show, setShow] = useState(false);

  
  useEffect(() => {
    let buff = shownCards.includes(id);
    setShow(buff);
    
  }, [shownCards]);

  
  const onClick = (e) => {
    cardClicked(e.target);
  };

  return (
    
    <div
      id={id}
      imgid={imageId}
      className='mem-card'
      
      style={{
        backgroundColor: show ? '#D3D3D3' : null,
        width: '100%',
        border: '2px solid #000',
        borderRadius: '5px',
        pointerEvents: show ? 'none' : 'auto',
      }}
      onClick={onClick}
    >
      <img
        id={id}
        imgid={imageId}
        alt='card-figure'
        
        src={`https://robohash.org/${imageId}` + source}
        
        style={{ 
          visibility: !show ? 'hidden' : 'visible',
          width: '100%', 
          height: 'auto'
        }}
      ></img>
    </div>
  );
};

export default CardItem;