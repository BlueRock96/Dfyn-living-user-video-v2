import React, { useState } from 'react'
import styles from "./categorySelect.module.css";

const CategorySelect = ( {categoryList , filterVideos}) => {

    
    return (
            <>
                    <div className='row'>
                        <div className= {`${styles.categoryContainer} ${styles.disableScrollbars}`}>
                                <button  onClick={e=>filterVideos({categoryId: 0})} className={`${styles.categoryBtn} ${styles.categoryBtnFirst}`}>All</button>
                                {categoryList.map((category) =>
                                    <button onClick={e=>filterVideos(category)} className={styles.categoryBtn} >{category.label}</button>
                                )}
                        </div>
                    </div>
            </>
        )
    }

export default CategorySelect