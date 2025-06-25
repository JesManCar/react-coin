import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './Coin.module.css'

function Coin () {
    const [coin, setCoin] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://rest.coincap.io/v3/assets/${id}?apiKey=${import.meta.env.VITE_APP_COIN_APIKEY}`)
        .then(response => response.json())
        .then(data => {
            setCoin(data.data)
        })
    }, [id])

    const addToFavorites = () => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (!storedFavorites.find(item => item.id === coin.id)) {
            storedFavorites.push(coin);
            localStorage.setItem('favorites', JSON.stringify(storedFavorites));
            alert(`${coin.name} añadido a favoritos`);
        }
    }
    const removeFromFavorites = () => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (storedFavorites.find(item => item.id === coin.id)) {
            const updatedFavorites = storedFavorites.filter(item => item.id !== coin.id);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            alert(`${coin.name} eliminado de favoritos`);
        }
    }

  return (
    <>
        <h2>Detalles de la moneda</h2>
        {coin && (
            <div className={styles.coin}>
                <div className={styles.data}>
                    <p>Nombre: {coin.name}</p>
                    <p>Símbolo: {coin.symbol}</p>
                    <p>Rango: {coin.rank}</p>
                    <p>Precio: {coin.priceUsd}</p>
                    <p>Capitalización de mercado: {coin.marketCapUsd}</p>
                    <div className={styles.buttons}>
                    <button className={styles.button} onClick={addToFavorites}>Añadir a Favoritos</button>
                    <button className={styles.button} onClick={removeFromFavorites}>Eliminar de Favoritos</button>
                    </div>
                </div>                
            </div>
        )}
    </>
  )
}

export default Coin