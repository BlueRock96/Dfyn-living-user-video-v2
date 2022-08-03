import React, { useState } from 'react'
import styles from "./categorySelect.module.css";

const CategorySelect = ( {activeId, categoryList , filterVideos}) => {
    const selected = { background: "#FFFFFF", color: '#000000' };
    const notSelected = { background: "#000000", color: '#FFFFFF' } ;
    
    
    return (
            <>
                    <div className='row'>
                        <div className= {`${styles.categoryContainer} ${styles.disableScrollbars}`}>
                                <button  onClick={e=>filterVideos({id: 0})} className={`${styles.categoryBtn} ${styles.categoryBtnFirst}`}>All</button>
                                {categoryList.map((category) =>
                                    <button key={category.id} onClick={e=>filterVideos(category)} className={styles.categoryBtn}  
                                    style={activeId === category.id ? selected : notSelected}>
                                    {category.name}</button>
                                )}
                        </div>
                    </div>
            </>
        )
    }

export default CategorySelect