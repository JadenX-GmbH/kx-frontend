import react from "react";

import { useHistory } from "react-router-dom";
import { GigType } from "../../../util/types";

const { default: TruncateText } = require("../../../util/Truncate");

const GigRow = ({ gig }: { gig: GigType }) => {
  // console.log(gig);
  let history = useHistory();

  const goTo = (id: string) => {
    history.push(`/admin/gigs/${id}`);
  };

  return (
    <tr className="clickable" onClick={() => goTo(gig.id)}>
      <th scope="row">
        <TruncateText text={gig.id} length={12} />
      </th>
      <td>{gig.title}</td>

      <td>{gig.price} Euro</td>
      <td className="text-center">{gig.offer.length}</td>
      <td className="text-center">{gig.sla.length}</td>
      <td>
        <TruncateText text={gig.status} length={12} />
      </td>
    </tr>
  );
};

export default GigRow;
