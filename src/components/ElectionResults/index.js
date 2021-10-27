import React from "react"
import { EthersUtil } from "Utils/EthersUtil"
import { ResultsTable } from "./resultsTable"


export const ElectionResults = () => {

    // const [candidateCount, setCandidateCount] = useState(0)
    // const [candidateList, setCandidateList] = useState([])

    // useEffect(() => {

    //     // return () => { console.log('clean up') }
    //   },[])

    
    EthersUtil.initProvider()

    if (EthersUtil.provider !== null && EthersUtil.Signer !== null) {
        EthersUtil.initContractInstances()
    }
    

    
    return(
            <ResultsTable>
                ELECTION RESULTS SECTION
            </ResultsTable>
    )
}