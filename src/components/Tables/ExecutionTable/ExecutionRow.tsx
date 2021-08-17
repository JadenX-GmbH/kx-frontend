import react from "react";

import { useHistory } from "react-router-dom";
import { Execution } from "../../../util/types";

const { default: TruncateText } = require("../../../util/Truncate");

const OfferRow = ({ data }: { data: Execution }) => {
  // console.log(gig);
  let history = useHistory();

  const goTo = (id: string) => {
    history.push(`/admin/executions/${id}`);
  };

  return (
    <tr className="clickable" onClick={() => goTo(data.id)}>
      <th scope="row">
        <TruncateText text={data.id} length={12} />
      </th>
      <td>
        <TruncateText text={data.description} length={12} />
      </td>
      <td className="text-center">{data.executionType}</td>
      <td className="text-center">{data.workerPool}</td>
      <td className="text-center">{data.worker}</td>
      <td className="text-center">{data.dateCreated}</td>
      <td className="text-center">--</td>
      <td className="text-center">{data.gig}</td>
    </tr>
  );
};

export default OfferRow;
