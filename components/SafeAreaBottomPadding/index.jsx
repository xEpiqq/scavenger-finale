import react from "react";

import styles from "./component.module.scss";

function Component() {
  const myObserver = new ResizeObserver((entries, observer) => {
    for (let entry of entries) {
      entries.forEach((entry) => {
        //const windowFullHeight = parseFloat(window.outerHeight);
        document.documentElement.style.setProperty(
          "--webkit-footer-gap",
          `${entry.contentRect.height}px`
        );
      });
    }
  });

  const myElement = styles.webkit_gap

  return (
    <div className={styles.safe_area_bottom}>
    </div>
  );
}

export default Component;
