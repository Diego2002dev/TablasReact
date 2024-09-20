import React, { useEffect, useState } from 'react'
import styles from "./loading.module.css"

const Loading = () => {

  const [timeOut, setTimeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTimeOut(true);
    }, 400);
  }, [])

  return (
      timeOut ? (
      <div id={styles.contenedorLoading}>
      <div className={styles.loader}></div>
      </div>
      
      ) : null 
  )
}

export default Loading