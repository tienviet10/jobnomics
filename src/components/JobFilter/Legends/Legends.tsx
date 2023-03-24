import React from "react";
import styles from "./Legends.module.css";


const Legends = (): JSX.Element => {

  return (
    <div className={styles.LegendContainer}>
      <div className={styles.LegendItem} >
        <div className={styles.LegendColor} style={{ borderTop: '4px solid pink' }}></div>
        <div className={styles.LegendLabel} >Bookmarked</div>
      </div>
      <div className={styles.LegendItem}>
        <div className={styles.LegendColor} style={{ borderTop: '4px solid green' }}></div>
        <div className={styles.LegendLabel}>Applied</div>
      </div>
      <div className={styles.LegendItem}>
        <div className={styles.LegendColor} style={{ borderTop: '4px solid blue' }}></div>
        <div className={styles.LegendLabel}>Interviewing</div>
      </div>
      <div className={styles.LegendItem} >
        <div className={styles.LegendColor} style={{ borderTop: '4px solid yellow' }}></div>
        <div className={styles.LegendLabel} >Interviewed</div>
      </div>
      <div className={styles.LegendItem}>
        <div className={styles.LegendColor} style={{ borderTop: '4px solid purple' }}></div>
        <div className={styles.LegendLabel}>Job Offer</div>
      </div>
      <div className={styles.LegendItem}>
        <div className={styles.LegendColor} style={{ borderTop: '4px solid lime' }}></div>
        <div className={styles.LegendLabel}>Position Filled</div>
      </div>
      <div className={styles.LegendItem}>
        <div className={styles.LegendColor} style={{ borderTop: '4px solid red' }}></div>
        <div className={styles.LegendLabel}>Inactive Job</div>
      </div>
    </div>
  );
};

export default Legends;
