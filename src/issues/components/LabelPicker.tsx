import { useLabels } from "../hooks";
import Loading from "../../shared/components/Loading";

interface Props {
  selectedLabels: string[];
  onChange: (labelName: string) => void;
}



export const LabelPicker = ({ selectedLabels, onChange }: Props) => {
  const { dataLabels, isLoading, isError } = useLabels();

  return (
    <>
      {isLoading && <Loading/>}
      {isError && <p>Error</p>}
      {dataLabels &&
        dataLabels?.map(
          (label: { name: string; color: string; id: number }) => (
            <span
              key={label.id}
              className={`badge rounded-pill m-1 label-picker ${ selectedLabels.includes(label.name) ? 'bg-primary text-white' : ''}`}
              style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
              onClick={() => onChange(label.name)}
            >
              {label.name}
            </span>
          )
        )}
    </>
  );
};
