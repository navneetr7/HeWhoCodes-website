import { storeHorizon } from "@/data/store";
import "./store-section.css";

export function StoreHorizon() {
  return (
    <div className="store-horizon__stage glass-display__stage">
      <p className="glass-display__title">
        <span className="glass-display__line">{storeHorizon.lineOne}</span>
        <span className="glass-display__line">{storeHorizon.lineTwo}</span>
      </p>
    </div>
  );
}