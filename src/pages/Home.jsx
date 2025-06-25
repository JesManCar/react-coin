//require('dotenv').config()
//import "dotenv/config";
import.meta.env.VITE_APP_API_URL
import {useState, useEffect} from 'react';
import styles from './Home.module.css';
const LIMIT = 10;


function Home () {

    const [coins, setCoins] = useState([])
    const [actual, setActual] = useState(0)

    useEffect(() => {
        const storedPage = localStorage.getItem('actualPage');
        const initialPage = storedPage ? parseInt(storedPage, 10) : 0;
        setActual(initialPage);
        bringCoins(initialPage, initialPage + LIMIT);
    }, [])

    const bringCoins = (ini) => {
      fetch(`https://rest.coincap.io/v3/assets?apiKey=${import.meta.env.VITE_APP_COIN_APIKEY}&limit=${LIMIT}&offset=${ini}`)
        .then(response => response.json())
        .then(data => {
            setCoins(data.data)
            console.log(data.data)
        })
        .catch(error => console.error(error))
    }

    const saveActualPage = (page) => {
      localStorage.setItem('actualPage', page);
    }

    const handlePages = (ind) => {
      if (actual + ind < 0 || actual + ind > 2000) {
        return;
      }
      if (ind === 0) {
        setActual(0);
        bringCoins(0);
        saveActualPage(0);
        return;
      }
      setActual(actual + ind);
      bringCoins(actual + ind);
      saveActualPage(actual + ind);
    }

  return (
    <>
      <h2>Listado de monedas</h2>
    <div className={styles.buttons}>
      <button className={styles.button} onClick={() => {handlePages(0)}}>Inicio</button>
      <button className={styles.button} onClick={() => {handlePages(LIMIT*(-1))}}>Anterior</button>
      <button className={styles.button} onClick={() => {handlePages(LIMIT)}}>Siguiente</button>
    </div>
    <div className={styles.actualPage}>
      <p>Página actual: {actual / LIMIT + 1}</p>
    </div>
    <div className={styles.table}>
      <table className={styles.coin}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Enlace</th>
            </tr>
          </thead>
          <tbody>
      {coins.map(coin => (
            <tr key={coin.id} >
              <td className={styles.name}>{coin.name}</td>
              <td className={styles.prices}>{coin.priceUsd}</td>
              <td><a href={`/coin/${coin.id}`}>{coin.name} ({coin.symbol})</a></td>
            </tr>
        
      ))}
      </tbody>
      </table>
    </div>

    </>
  )
}

export default Home