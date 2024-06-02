import { githubApi } from "../../api/githubApi"
import { Issue } from "../interfaces"
import { useQuery } from "@tanstack/react-query"

const getIssues = async() : Promise<Issue[]> => {
  
  const { data } = await githubApi.get<Issue[]>('/issues')
  console.log(data)
  return data
}

const useIssues = () => {
  const { data: dataIssues, isLoading, isError } = useQuery({
    queryKey: ["issues"],
    queryFn: getIssues,
    refetchOnWindowFocus() {
      return false
    },
  })
  
  return { dataIssues, isLoading, isError}
}

export default useIssues