import react from "react";

import { DataSet } from "../../../util/types";
const { default: TruncateText } = require("../../../util/Truncate");

const OfferRow = ({ data }: { data: DataSet }) => {
  const goTo = () => {
    if (data.storageType === "IPFS") window.open(data.location, "_blank", "noopener,noreferrer");
  };

  return (
    <tr className="clickable" onClick={() => goTo()}>
      <th scope="row">
        {data.id}
      </th>

      <td>{data.title}</td>

      <td>
        <TruncateText text={data.description} length={30} />
      </td>
      {/* <td>{data.location}</td> */}
      <td className="text-center">{data.storageType}</td>
    </tr>
  );
};

export default OfferRow;
