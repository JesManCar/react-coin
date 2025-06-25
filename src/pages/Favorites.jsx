import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Favorites.module.css';

function Favorites () {

  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

    const removeFromFavorites = (id) => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const updatedFavorites = storedFavorites.filter(item => item.id !== id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
    }


  return (
    <div>
      <h2>Mis Favoritos</h2>
      <ul className={styles.list}>
        {favorites.map(coin => (
          <li className={styles.element} key={coin.id}>
            <Link className={styles.link} to={`/coin/${coin.id}`}>{coin.name} ({coin.symbol}) </Link>
                <button className={styles.button} onClick={() => removeFromFavorites(coin.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}


export default Favorites