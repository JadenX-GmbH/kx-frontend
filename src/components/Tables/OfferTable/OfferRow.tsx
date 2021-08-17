import react from "react";

import { useHistory } from "react-router-dom";

import { Offer } from "../../../util/types";

const { default: TruncateText } = require("../../../util/Truncate");

const OfferRow = ({ offer }: { offer: Offer }) => {
  // console.log(gig);
  let history = useHistory();

  const goTo = (id: string) => {
    history.push(`/admin/gigs/gig-12/offers/${id}`);
  };

  return (
    <tr className="clickable" onClick={() => goTo(offer.id)}>
      <th scope="row">
        <TruncateText text={offer.id} length={12} />
      </th>

      <td className="text-center">{offer.accepted ? "Accepted" : "Open"}</td>
      <td className="text-center">{offer.price} Euro</td>
      <td>
        <TruncateText text={offer.description} length={12} />
      </td>
      <td className="text-center">{offer.dateCreated}</td>
      <td className="text-center">--</td>
    </tr>
  );
};

export default OfferRow;
