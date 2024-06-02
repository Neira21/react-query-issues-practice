import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';
import Loading from '../../shared/components/Loading';


export const ListView = () => {

  const [selectedLabels, setSelectedLaber] = useState<string[]>([])

  const {dataIssues, isLoading, isError} = useIssues()

  const onChangeLabel = (labelName: string) => {
    (selectedLabels.includes(labelName))
      ? setSelectedLaber(selectedLabels.filter(label => label !== labelName))
      : setSelectedLaber([...selectedLabels, labelName])
  }

  return (
    <div className="row mt-5">
      
      <div className="col-8">
        {isLoading 
          ? <Loading/> 
          : <IssueList issues = { dataIssues || []} />
        }
        
      </div>
      
      <div className="col-4">
        <LabelPicker 
          selectedLabels = {selectedLabels} 
          onChange = { (labelName) => onChangeLabel(labelName) }
          
          />
      </div>
    </div>
  )
}
