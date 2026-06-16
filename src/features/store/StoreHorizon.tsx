import { storeHorizon } from "@/data/store";
import "./store-section.css";

export function StoreHorizon() {
  return (
    <div className="store-horizon__stage">
      <p className="store-horizon__title">
        <span className="store-horizon__line">{storeHorizon.lineOne}</span>
        <span className="store-horizon__line">{storeHorizon.lineTwo}</span>
      </p>
    </div>
  );
}