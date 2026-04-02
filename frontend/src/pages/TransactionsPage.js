import React, { useMemo, useState } from "react";
import DataTable from "../components/DataTable";
import FilterDropdown from "../components/FilterDropdown";
import FormModal from "../components/FormModal";
import PermissionBanner from "../components/PermissionBanner";
import StatusBadge from "../components/StatusBadge";

const defaultForm = {
  type: "stock-in",
  tileId: "",
  quantity: 0,
  reason: "",
  referenceId: "",
  date: "",
};

export default function TransactionsPage({ transactions, tiles, saveTransaction, canDoTransactions }) {
  const [type, setType] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);

  const filtered = useMemo(
    () =>
      transactions.filter((row) => {
        const matchesType = type === "all" || row.type === type;
        const matchesDate = !dateFilter || row.date === dateFilter;
        return matchesType && matchesDate;
      }),
    [transactions, type, dateFilter]
  );

  const columns = [
    { key: "date", header: "Date" },
    { key: "type", header: "Type", render: (row) => <StatusBadge label={row.type} tone={tone(row.type)} /> },
    {
      key: "tileId",
      header: "Tile",
      render: (row) => tiles.find((tile) => tile.id === row.tileId)?.name || `Tile ${row.tileId}`,
    },
    { key: "quantity", header: "Quantity" },
    { key: "performedBy", header: "Performed By" },
    { key: "reason", header: "Reason" },
    { key: "referenceId", header: "Reference" },
  ];

  const submit = (event) => {
    event.preventDefault();
    saveTransaction({ ...form, tileId: Number(form.tileId), quantity: Number(form.quantity) });
    setForm(defaultForm);
    setModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {!canDoTransactions ? <PermissionBanner message="You do not have permission to perform stock transactions." /> : null}

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-wrap items-end gap-3">
          <FilterDropdown
            label="Type"
            value={type}
            onChange={setType}
            options={[
              { label: "All", value: "all" },
              { label: "Stock In", value: "stock-in" },
              { label: "Stock Out", value: "stock-out" },
              { label: "Damage", value: "damage" },
              { label: "Transfer", value: "transfer" },
            ]}
          />
          <label className="flex min-w-[170px] flex-col gap-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Date
            <input
              type="date"
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"
            />
          </label>
        </div>
        <button
          type="button"
          disabled={!canDoTransactions}
          onClick={() => setModalOpen(true)}
          className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-sky-700 disabled:opacity-40"
        >
          Add Transaction
        </button>
      </div>

      <DataTable columns={columns} data={[...filtered].sort((a, b) => b.date.localeCompare(a.date))} />

      <FormModal isOpen={isModalOpen} title="Add Stock Transaction" onClose={() => setModalOpen(false)}>
        <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={submit}>
          <label className="grid gap-1 text-sm font-semibold text-slate-700">
            Type
            <select
              value={form.type}
              onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}
              className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
            >
              <option value="stock-in">Stock In</option>
              <option value="stock-out">Stock Out</option>
              <option value="damage">Damage</option>
              <option value="transfer">Transfer</option>
            </select>
          </label>
          <label className="grid gap-1 text-sm font-semibold text-slate-700">
            Tile
            <select
              required
              value={form.tileId}
              onChange={(event) => setForm((prev) => ({ ...prev, tileId: event.target.value }))}
              className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
            >
              <option value="">Select Tile</option>
              {tiles.map((tile) => (
                <option key={tile.id} value={tile.id}>
                  {tile.name}
                </option>
              ))}
            </select>
          </label>
          <Field
            label="Quantity"
            value={form.quantity}
            onChange={(value) => setForm((prev) => ({ ...prev, quantity: value }))}
            type="number"
            required
          />
          <Field
            label="Reference ID"
            value={form.referenceId}
            onChange={(value) => setForm((prev) => ({ ...prev, referenceId: value }))}
            required
          />
          <Field label="Date" value={form.date} onChange={(value) => setForm((prev) => ({ ...prev, date: value }))} type="date" required />
          <label className="grid gap-1 text-sm font-semibold text-slate-700 md:col-span-2">
            Reason
            <textarea
              required
              value={form.reason}
              onChange={(event) => setForm((prev) => ({ ...prev, reason: event.target.value }))}
              className="min-h-[80px] rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
            />
          </label>
          <div className="md:col-span-2 flex justify-end gap-2">
            <button type="button" onClick={() => setModalOpen(false)} className="rounded-lg border border-slate-200 px-4 py-2">
              Cancel
            </button>
            <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-white">
              Save
            </button>
          </div>
        </form>
      </FormModal>
    </div>
  );
}

function tone(type) {
  if (type === "stock-in") return "success";
  if (type === "stock-out") return "warning";
  if (type === "damage") return "danger";
  return "info";
}

function Field({ label, value, onChange, type = "text", required = false }) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-slate-700">
      {label}
      <input
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
      />
    </label>
  );
}
