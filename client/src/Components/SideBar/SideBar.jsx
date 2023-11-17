import React from "react";
import { useState } from "react";
import "./SideBar.css";
import { FcLeftDown2 } from "react-icons/fc";

export default function SideBar({ tab, setTab, setFilter }) {
  function runSetTab(prop) {
    if (tab == prop) {
      setTab("none");
      setFilter("none");
    } else {
      setTab(prop);
      setFilter("none");
    }
  }
  function runSetFilter(prop) {
    setFilter(prop);
  }
  if (tab === "none") {
    return (
      <div className="sidebar">
        <button className="button-sidebar" onClick={() => runSetTab("Type")}>
          Type
        </button>
        <button
          className="button-sidebar"
          onClick={() => runSetTab("Category")}
        >
          Category
        </button>
        <button className="button-sidebar" onClick={() => runSetTab("Remote")}>
          Remote
        </button>
        <button
          className="button-sidebar"
          onClick={() => runSetTab("PayRange")}
        >
          PayRange
        </button>
      </div>
    );
  } else if (tab === "Type") {
    return (
      <div className="sidebar">
        <button
          className="button-sidebar-pressed"
          onClick={() => runSetTab("Type")}
        >
          Type
        </button>
        <button
          className="button-sidebar-active"
          onClick={() => runSetFilter("Job")}
        >
          Job
        </button>
        <button
          className="button-sidebar-active"
          onClick={() => runSetFilter("Conference")}
        >
          Conference
        </button>
        <button
          className="button-sidebar"
          onClick={() => runSetTab("Category")}
        >
          Category
        </button>
        <button className="button-sidebar" onClick={() => runSetTab("Remote")}>
          Remote
        </button>
        <button
          className="button-sidebar"
          onClick={() => runSetTab("PayRange")}
        >
          PayRange
        </button>
      </div>
    );
  } else if (tab === "Category") {
    return (
      <div className="sidebar">
        <button className="button-sidebar" onClick={() => runSetTab("Type")}>
          Type
        </button>
        <button
          className="button-sidebar-pressed"
          onClick={() => runSetTab("Category")}
        >
          Category
        </button>
        <button
          className="button-sidebar-active"
          onClick={() => runSetFilter("Newgrad")}
        >
          New Grad
        </button>
        <button
          className="button-sidebar-active"
          onClick={() => runSetFilter("Internship")}
        >
          Internships
        </button>
        <button className="button-sidebar" onClick={() => runSetTab("Remote")}>
          Remote
        </button>
        <button
          className="button-sidebar"
          onClick={() => runSetTab("PayRange")}
        >
          PayRange
        </button>
      </div>
    );
  } else if (tab === "Remote") {
    return (
      <div className="sidebar">
        <button className="button-sidebar" onClick={() => runSetTab("Type")}>
          Type
        </button>
        <button
          className="button-sidebar"
          onClick={() => runSetTab("Category")}
        >
          Category
        </button>
        <button
          className="button-sidebar-pressed"
          onClick={() => runSetTab("Remote")}
        >
          Remote
        </button>
        <button
          className="button-sidebar-active"
          onClick={() => runSetFilter("Yes")}
        >
          Yes
        </button>
        <button
          className="button-sidebar-active"
          onClick={() => runSetFilter("No")}
        >
          No
        </button>
        <button
          className="button-sidebar"
          onClick={() => runSetTab("PayRange")}
        >
          PayRange
        </button>
      </div>
    );
  } else if (tab === "PayRange") {
    return (
      <div className="sidebar">
        <button className="button-sidebar" onClick={() => runSetTab("Type")}>
          Type
        </button>
        <button
          className="button-sidebar"
          onClick={() => runSetTab("Category")}
        >
          Category
        </button>
        <button className="button-sidebar" onClick={() => runSetTab("Remote")}>
          Remote
        </button>
        <button
          className="button-sidebar-pressed"
          onClick={() => runSetTab("PayRange")}
        >
          PayRange
        </button>
        <button
          className="button-sidebar-active"
          onClick={() => runSetFilter("0K-50K")}
        >
          0K-50K
        </button>
        <button
          className="button-sidebar-active"
          onClick={() => runSetFilter("50K-100K")}
        >
          50K-100K
        </button>
        <button
          className="button-sidebar-active"
          onClick={() => runSetFilter("100K-150K")}
        >
          100K-150K
        </button>
        <button
          className="button-sidebar-active"
          onClick={() => runSetFilter("150K-200K")}
        >
          150K-200K
        </button>
        <button
          className="button-sidebar-active"
          onClick={() => runSetFilter("200K-250K")}
        >
          200K-250K
        </button>
        <button
          className="button-sidebar-active"
          onClick={() => runSetFilter("250K-300K")}
        >
          250K-300K
        </button>
        <button
          className="button-sidebar-active"
          onClick={() => runSetFilter("300K+")}
        >
          300K+
        </button>
      </div>
    );
  }
}
