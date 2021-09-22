import react from "react";

import { useHistory } from "react-router-dom";
import { GigType } from "../../../util/types";

// const { default: TruncateText } = require("../../../util/Truncate");

const GigRow = ({ gig, accepted }: { gig: GigType, accepted: boolean }) => {
  // console.log(gig);
  let history = useHistory();
  console.log('accepted', accepted);

  const goTo = (id: number) => {
    history.push(`/gigs/${id}`);
  };

  return (
    <tr className={`clickable ${accepted ? 'bg-green-light' : ''}`} onClick={() => goTo(gig.id)}>
      <th scope="row">{gig.id}</th>
      <td>{gig.title}</td>

      <td>{gig.price ? gig.price : 0} Euro</td>
      <td>{gig.maxPrice} Euro</td>
      <td className="text-center">0</td>
      <td className="text-center">0</td>
      <td>{gig.status}</td>
    </tr>
  );
};

export default GigRow;
