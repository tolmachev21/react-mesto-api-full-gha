import { useEffect, useState } from 'react';
import select from '../../images/Vector-love.svg';
import api from '../../utils/Api';

function ButtonLike({ likes, myId, cardId }) {
  const [counter, setCounter] = useState(likes.length);
  const [isLike, setLike] = useState(false);

  useEffect(() => {
    setLike(likes.some((item) => myId === item._id))
  }, [likes, myId]);

  function handleLike() {
    if (isLike) {
      api.deleteLikeCard(cardId, localStorage.token)
        .then((res) => {
          setLike(false)
          setCounter(res.likes.length)
        })
        .catch((err) => console.log(`Ошибка при удалении лайка ${err}`))
    } else {
      api.addLikeCard(cardId, localStorage.token)
        .then((res) => {
          setLike(true)
          setCounter(res.likes.length)
        })
        .catch((err) => console.log(`Ошибка при добавлении лайка ${err}`))
    }
  };

  return (
    <>
      <img className={`place__select ${isLike ? 'place__select_active' : ''}`} src={select} alt="Положить в избранное" onClick={handleLike}></img>
      <p className="place__counter">{counter}</p>
    </>
  )
};

export default ButtonLike;