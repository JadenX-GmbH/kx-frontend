import React from "react";

import { useHistory } from "react-router-dom";

import { OfferType } from "../../../util/types";

import { Badge } from "reactstrap";

const { default: TruncateText } = require("../../../util/Truncate");

const OfferRow = ({ offer }: { offer: OfferType }) => {
  // console.log(gig);
  let history = useHistory();

  const goTo = (id: string) => {
    history.push(`/gigs/${offer.gig}/offers/${id}`);
  };
  const strippedDescription = offer.description.replace(/(<([^>]+)>)/gi, "");

  return (
    <tr className="clickable" onClick={() => goTo(offer?.id)}>
      <th scope="row">
        {/* <TruncateText text={offer.id} length={12} /> */}
        {offer.id}
      </th>

      <td className="text-center">
        {offer.accepted ? <Badge color="success">Accepted</Badge> : "Open"}
      </td>
      <td className="text-center">{offer.price} Euro</td>
      <td>
        <TruncateText text={strippedDescription} length={70} />
      </td>
      <td className="text-center">{offer.gig}</td>
    </tr>
  );
};

export default OfferRow;
