import { useQuery } from "@tanstack/react-query"
import { githubApi } from "../../api/githubApi"
import { Issue } from "../interfaces"
import { sleep } from "../../helpers/sleep"



const getIssue = async (issueNumber: number) : Promise<Issue> => {
  await sleep(2)
  const { data } = await githubApi.get(`/issues/${issueNumber}`)
  console.log(data)
  return data
}

const getIssueComments = async (issueNumber: number) : Promise<Issue[]> => {
  await sleep(2)
  const { data } = await githubApi.get(`/issues/${issueNumber}/comments`)
  console.log(data)
  return data
}


const useIssue = (issueNumber : number) => {
  
  const queryIssue = useQuery({
    queryKey: ['issue', issueNumber],
    queryFn: () => getIssue(issueNumber),
    refetchOnWindowFocus: false,
  })

  const queryIssueComments = useQuery({
    queryKey: ['issue', issueNumber, 'comments'],
    queryFn: () => getIssueComments(issueNumber),
    refetchOnWindowFocus: false,
    enabled: queryIssue.isSuccess
  })

  return {
    queryIssue,
    queryIssueComments
  }
}

export default useIssue