import { MultiSelect } from "@mantine/core";

const MultiSelectComponent = ({ setFilter, filter }) => {
  return (
    <MultiSelect
      placeholder="Ajouter des supports"
      data={["WMag", "Rouges et Blancs", "AmbitionSud", "Roses en Provence  "]}
      value={filter.support}
      comboboxProps={{ transitionProps: { transition: "pop", duration: 200 } }}
      onChange={(value) => setFilter("support", value)}
    />
  );
};

export default MultiSelectComponent;
