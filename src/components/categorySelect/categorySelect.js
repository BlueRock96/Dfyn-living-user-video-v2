import React, { useState } from 'react'
import styles from "./categorySelect.module.css";

const CategorySelect = () => {

    const [categoryList ] = useState([
        {id: 1, label: 'Music'},{id: 2, label: 'Gaming'},{id: 3, label: 'Trailers'},
        {id: 4, label: 'T-Series'},{id: 5, label: 'Recently Uploaded'},{id: 6, label: 'Graphic Design'},
        {id: 7, label: 'Shopping'},{id: 8, label: 'Russia War'},{id: 9, label: 'Nifty 50'},
        {id: 10, label: 'Sony Music'}])
   
    return (
            <>

                    <div className= {`${styles.categoryContainer} ${styles.disableScrollbars}`}>
                                <button  className={`${styles.categoryBtn} ${styles.categoryBtnFirst}`}>All</button>
                                
                                {categoryList.map((category) =>
                                    <button  className={styles.categoryBtn} >{category.label}</button>
                                )}
                            </div>
            </>
        )
    }

export default CategorySelect