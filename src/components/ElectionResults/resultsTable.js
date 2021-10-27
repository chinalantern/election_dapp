import React from "react"
// reactstrap components
import { Table, Card, Container } from 'reactstrap'


export const ResultsTable = props => {


    const loadCandidate = props => (
        <tr>
            <td className="text-center">ID</td>
            <td className="text-center">NAME</td>
            <td className="text-center">VOTES</td>
        </tr>
    )
    

    return(
        <Container>
          <Card className="card-coin card-plain">
            <Table hover dark>
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Votes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loadCandidate(props)}
                    </tbody>
                </Table>
            </Card>
        </Container>
    )

}