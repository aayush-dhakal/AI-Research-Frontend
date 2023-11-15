"use client";

import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Table } from "antd";
import TeamContext from "@/context/team/TeamContext";
import { getTeamColumns } from "@/utils/table/teamColumns";

const Teams = () => {
  const router = useRouter();

  const { teams, getTeams, deleteTeam, setCurrentTeam, currentTeam } =
    useContext(TeamContext);

  const handleDeleteTeam = (id) => {
    deleteTeam(id);
  };

  const handleEditTeam = (team) => {
    console.log("team....", team);
    setCurrentTeam(team);
    console.log("currentTeam....", currentTeam);
    router.push("/admin/teams/edit");
  };

  const teamColumns = getTeamColumns(handleDeleteTeam, handleEditTeam);

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between mb-2">
        <div>
          <Link href="/admin">
            <Button type="primary">Go back to admin</Button>
          </Link>
        </div>
        <h3 className="mb-2 text-info">Teams</h3>
        {/* <Link href="/admin/teams/add">
          <Button type="primary">Add Team</Button>
        </Link> */}
      </div>
      <Table dataSource={teams} columns={teamColumns} />
    </div>
  );
};

export default Teams;
