import React from "react";
import { Link, useParams } from "react-router-dom";

const Establishment = () => {
  const params = useParams<{
    id: string;
  }>();
  console.log("params", params);

  return <main>Establishment {params.id}</main>;
};

export default Establishment;
