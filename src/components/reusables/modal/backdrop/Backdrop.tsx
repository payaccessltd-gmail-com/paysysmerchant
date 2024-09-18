import React from 'react'
import styles from './backdrop.module.css'

const Backdrop = (props: any) => {
    return (
        props.show ?
            <div className={`blur-sm backdrop-blur-sm ${styles.backdrop}`} onClick={props.closeModal}></div>
            : null
    )
}

export default Backdrop