import React from "react";
import { useState } from "react";

import "./Opportunities.css";
import SideBar from "../../Components/SideBar/SideBar";
import OpportunitiesGrid from "../../Components/OpportunitiesGrid/OpportunitiesGrid";

export default function Opportunities() {
  const [tab, setTab] = useState("none");
  const [filter, setFilter] = useState("none");
  return (
    <>
      <div>
        <SideBar tab={tab} setTab={setTab} setFilter={setFilter}></SideBar>
      </div>
      <div className="right-part">
        <OpportunitiesGrid tab={tab} filter={filter} />
      </div>
    </>
  );
}
