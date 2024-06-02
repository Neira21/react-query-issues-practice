import { useQuery } from "@tanstack/react-query";
import { Label } from "../interfaces/label";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers/sleep";

const getLabels = async () :Promise<Label[]> => {

  await sleep(2)

  const {data} = await githubApi.get<Label[]>('/labels', {
    headers: {
      Authorization: null
    }
  })
  console.log(data)
  return data
}
  
const useLabels = () => {

  const { data: dataLabels, isLoading, isError } = useQuery({
    queryKey: ["labels"],
    queryFn: getLabels,
    refetchOnWindowFocus() {
      return false;
    },

    // Placeholder: Se cuenta con una data que se muestra mientras se carga la data real
    // Initially, muestra la data inicial, y luego la data real, se conserva la data que esté acá si se definiera un timepo de stalTime (staleTime)
    // StallTime: Tiempo en el que se mantiene la data inicial, si se define, se muestra la data inicial por ese tiempo, y luego se muestra la data real

    placeholderData: [
      {
        id: 2281766624, 
        node_id: "MDU6TGFiZWwyMjgxNzY2NjI0",
        url: "https://api.github.com/repos/facebook/react/labels/Component:%20Scheduling%20Profiler",
        name: "Component: Scheduling Profiler",
        color: "1dc3d6",
        default: false
      },
      {
        id: 139734344,
        node_id: "MDU6TGFiZWwxMzk3MzQzNDQ=",
        url: "https://api.github.com/repos/facebook/react/labels/Component:%20Test%20Utils",
        name: "Component: Test Utils",
        color: "eb6420",
        default: false
      }
    ]
  });

  return {
    dataLabels,
    isLoading,
    isError
  }
}

export default useLabels