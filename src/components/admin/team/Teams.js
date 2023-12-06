"use client";

import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Table } from "antd";
import TeamContext from "@/context/team/TeamContext";
import { getTeamColumns } from "@/utils/table/teamColumns";

const Teams = () => {
  const router = useRouter();

  const { teams, getTeams, deleteTeam, setCurrentTeam, totalTeams } =
    useContext(TeamContext);

  const handleDeleteTeam = (id) => {
    deleteTeam(id);
  };

  const handleEditTeam = (team) => {
    setCurrentTeam(team);
    router.push("/admin/teams/edit");
  };

  const teamColumns = getTeamColumns(handleDeleteTeam, handleEditTeam);

  const teamsSort = {
    sortBy: "createdAt",
    sortOrder: "desc",
  };
  const numberOfTeamsPerPage = 15;

  useEffect(() => {
    getTeams(teamsSort, 1, numberOfTeamsPerPage);
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
      </div>
      <Table
        dataSource={teams}
        columns={teamColumns}
        pagination={{
          pageSize: numberOfTeamsPerPage,
          total: totalTeams,
          onChange: (page) => {
            getTeams(teamsSort, page, numberOfTeamsPerPage);
          },
        }}
      />
    </div>
  );
};

export default Teams;
