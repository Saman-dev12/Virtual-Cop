"use client";
import React from "react";
import { DashHead } from "./components/dash-head";

const Dashboard = () => {
  return (
    <div className="dark bg-background text-foreground">
      <DashHead />
      Dash
    </div>
  );
};

export default Dashboard;
