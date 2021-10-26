import React from "react";


export const ResultsTable = props => {


    const loadCandidate = props => (
        <tr>
            <td className="text-center">props.id</td>
            <td className="text-center">props.name</td>
            <td className="text-center">props.votes</td>
        </tr>
    );
    

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