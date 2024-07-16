import styles from "./NotFound.module.scss";
import { Link } from 'react-router-dom';
import React from 'react';

const NotFound = () => {
    return (
        <div className={styles.notFoundPage}>
            <div className={styles.notFoundContainer}>
                <h1 className={styles.notFoundTitle}>404</h1>
                <p className={styles.notFoundMessage}>Страница не найдена</p>
                <Link to="/" className={styles.notFoundLink}>Вернуться на главную</Link>
            </div>
        </div>
    );
};

export default NotFound;
