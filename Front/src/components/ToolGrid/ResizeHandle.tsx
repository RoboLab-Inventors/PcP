/**
 * Un componente funzionale che rende una maniglia di ridimensionamento per un pannello.
 * Utilizza il componente `PanelResizeHandle` dalla libreria `react-resizable-panels`.
 *
 * @param {Object} props - L'oggetto delle proprietà.
 * @param {string} [props.className=""] - Un nome di classe aggiuntivo opzionale da applicare alla maniglia di ridimensionamento esterna.
 * @param {string} [props.id] - Un id opzionale da applicare alla maniglia di ridimensionamento.
 *
 * @returns {JSX.Element} Il componente della maniglia di ridimensionamento renderizzato.
 */
import { PanelResizeHandle } from "react-resizable-panels";

import styles from "./styles.module.css";

export default function ResizeHandle({
  className = "",
  id,
}: {
  className?: string;
  id?: string;
}) {
  return (
    <PanelResizeHandle
      className={[styles.ResizeHandleOuter, className].join(" ")}
      id={id}
    >
      <div className={styles.ResizeHandleInner}>
        <svg className={styles.Icon} viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M8,18H11V15H2V13H22V15H13V18H16L12,22L8,18M12,2L8,6H11V9H2V11H22V9H13V6H16L12,2Z"
          />
        </svg>
      </div>
    </PanelResizeHandle>
  );
}
