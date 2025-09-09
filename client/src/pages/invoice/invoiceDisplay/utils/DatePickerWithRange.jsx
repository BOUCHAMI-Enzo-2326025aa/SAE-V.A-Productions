import { DatePickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";

const DatePickerWithRange = ({ setFilter, filter }) => {
  return (
    <DatePickerInput
      type="range"
      value={[filter.start, filter.end]}
      className="border-none"
      locale="fr"
      allowSingleDateInRange
      onChange={(value) => {
        setFilter("start", value[0]), setFilter("end", value[1]);
      }}
    />
  );
};

export default DatePickerWithRange;
