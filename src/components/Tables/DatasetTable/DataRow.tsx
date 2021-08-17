import react from "react";

import { useHistory } from "react-router-dom";
import { DataSet } from "../../../util/types";
const { default: TruncateText } = require("../../../util/Truncate");

const OfferRow = ({ data }: { data: DataSet }) => {
  let history = useHistory();

  const goTo = (id: string) => {
    // history.push(`/admin/gigs/gig-12/offers/${id}`);
  };

  return (
    <tr className="clickable" onClick={() => goTo(data.id)}>
      <th scope="row">
        <TruncateText text={data.id} length={12} />
      </th>

      <td>{data.title}</td>

      <td>
        <TruncateText text={data.description} length={12} />
      </td>
      <td>{data.location}</td>
      <td>{data.storage}</td>
      <td className="text-center">{data.created}</td>
      <td className="text-center">--</td>
    </tr>
  );
};

export default OfferRow;
