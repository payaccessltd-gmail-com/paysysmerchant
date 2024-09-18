import Backdrop from './backdrop/Backdrop';
import styles from './modal.module.css'


const Modal = (props: any) => {
    return (
        <>

            <div
                className={styles.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0',

                }}
            >
                <Backdrop show={props.show} closeModal={props.clicked} />
                <div className={`max-w-50 min-w-max ${styles.modaldialog} ${styles.modaldialogcentered}`}
                >
                    <div className={styles.modalcontent}>
                        <div className={styles.modalheader}>
                            {/* <img src='/icons/close.svg' className='cursor-pointer' onClick={props.clicked} /> */}
                        </div>

                        <div className={styles.modalbody}>
                            {props.children}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Modal
