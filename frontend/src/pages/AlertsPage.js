import React from "react";
import DataTable from "../components/DataTable";
import PermissionBanner from "../components/PermissionBanner";
import StatusBadge from "../components/StatusBadge";

export default function AlertsPage({ alerts, tiles, warehouses, resolveAlert, canEdit }) {
  const rows = alerts.map((alert) => {
    const tileName = tiles.find((tile) => tile.id === alert.tileId)?.name || `Tile ${alert.tileId}`;
    const warehouseName = warehouses.find((warehouse) => warehouse.id === alert.warehouseId)?.name || `Warehouse ${alert.warehouseId}`;
    const severity = alert.currentStock <= Math.max(1, Math.floor(alert.reorderLevel * 0.5)) ? "critical" : "warning";
    return { ...alert, tileName, warehouseName, severity };
  });

  const columns = [
    { key: "tileName", header: "Tile" },
    { key: "warehouseName", header: "Warehouse" },
    { key: "currentStock", header: "Current Stock" },
    { key: "reorderLevel", header: "Reorder Level" },
    {
      key: "severity",
      header: "Severity",
      render: (row) => <StatusBadge label={row.severity} tone={row.severity === "critical" ? "danger" : "warning"} />,
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge label={row.status} tone={row.status === "resolved" ? "success" : "danger"} />,
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) =>
        row.status === "open" ? (
          <button
            type="button"
            disabled={!canEdit}
            onClick={() => resolveAlert(row.id)}
            className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-40"
          >
            Mark Resolved
          </button>
        ) : (
          <span className="text-xs font-medium text-slate-500">Closed</span>
        ),
    },
  ];

  return (
    <div className="space-y-4">
      {!canEdit ? <PermissionBanner message="Staff role: alerts are view-only." /> : null}
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
