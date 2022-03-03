import React, { useMemo } from "react";
import useTable from "react-table";
import seaFish from "./data/seaFish";

const col = [
  { accessor: "name", Header: "품종" },
  { accessor: "구분", Header: "구분" },
  { accessor: "방생기준", Header: "방생기준" },
];

function FishData() {
  const columns = useMemo(() => col, []);
  const data = useMemo(() => seaFish, []);

  const tableInstance = useTable({ columns, data });

  return (
    <div>
      물고기 정보!
      <h1></h1>
    </div>
  );
}

export default FishData;
