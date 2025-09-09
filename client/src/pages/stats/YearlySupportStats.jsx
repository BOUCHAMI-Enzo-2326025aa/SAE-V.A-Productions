import wmag from "../../assets/supports/w-mag.png";
import ambitionsud from "../../assets/supports/ambition-sud.png";
import rouges_et_blancs from "../../assets/supports/rouges-et-blancs.png";
import roses_en_provence from "../../assets/supports/roses-en-provence.png";

import SupportStats from "./SupportStats";

const YearlySupportStats = ({ invoices }) => {
  return (
    <div className="mt-4 grid support-stats-grid">
      <SupportStats name="WMag" image={wmag} invoices={invoices} />
      <SupportStats
        name="AmbitionSud"
        image={ambitionsud}
        invoices={invoices}
      />
      <SupportStats
        name="Rouges et Blancs"
        image={rouges_et_blancs}
        invoices={invoices}
      />
      <SupportStats
        name="Roses en Provence"
        image={roses_en_provence}
        invoices={invoices}
      />
    </div>
  );
};

export default YearlySupportStats;
