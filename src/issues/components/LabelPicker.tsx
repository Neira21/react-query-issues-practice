import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { Label } from "../interfaces/Label";


const getLabels = async () :Promise<Label[]> => {
  const {data} = await githubApi.get<Label[]>('/labels')
  console.log(data)
  return data
}


export const LabelPicker = () => {
  // Desactivar focus
  const { data: dataLabels, isLoading, isError } = useQuery({
    queryKey: ["labels"],
    queryFn: getLabels,
    refetchOnWindowFocus() {
      return false;
    },
  });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {dataLabels &&
        dataLabels?.map((
          label: { name: string; color: string; id: number },
          index: number
         ) => (
          <div key={label.id}>
            <span
              className="badge rounded-pill m-1 label-picker"
              style={{ border: `1px solid ${label.color}`, color: label.color }}
            >
              {label.name}
            </span>
          </div>
        ))}
    </>
  );
};
