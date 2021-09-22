import react from 'react';

import { useHistory } from 'react-router-dom';
import { Execution, Exploration } from '../../../util/types';

import parse from 'html-react-parser';
const { default: TruncateText } = require('../../../util/Truncate');

const OfferRow = ({ data, isExecution }: { data: Execution | Exploration; isExecution: boolean }) => {
  // console.log(gig);
  let history = useHistory();

  const goTo = (id: number) => {
    if (isExecution) {
      history.push(`/executions/${id}`);
    } else {
      history.push(`/executions/explorations/${id}`);
    }
  };

  const strippedDescription = data.description.replace(/(<([^>]+)>)/gi, '');
  const executionData = data as Execution;

  return (
    <tr className="clickable" onClick={() => goTo(data.id)}>
      <th scope="row" style={{ width: '90px' }}>
        {data.id}
      </th>
      <td>
        <TruncateText text={strippedDescription} length={isExecution ? 12 : 60} />
      </td>
      {isExecution && (
        <>
          <td className="text-center">{executionData.executionType}</td>
          <td className="text-center">{executionData.workerPool}</td>
          <td className="text-center">{executionData.worker}</td>
        </>
      )}
      <td className="text-center">{data.dateCreated}</td>
      <td className="text-center">--</td>
      <td className="text-center">{data.gig}</td>
    </tr>
  );
};

export default OfferRow;
