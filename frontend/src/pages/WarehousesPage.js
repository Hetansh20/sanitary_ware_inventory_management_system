import React, { useState } from "react";
import { FiMapPin, FiPhone, FiUser } from "react-icons/fi";
import FormModal from "../components/FormModal";
import PermissionBanner from "../components/PermissionBanner";

const defaultForm = {
  name: "",
  location: "",
  contactPerson: "",
  contactNumber: "",
};

export default function WarehousesPage({ warehouses, saveWarehouse, canEdit }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState(null);
  const [form, setForm] = useState(defaultForm);

  const openCreate = () => {
    setEditingWarehouse(null);
    setForm(defaultForm);
    setModalOpen(true);
  };

  const openEdit = (warehouse) => {
    setEditingWarehouse(warehouse);
    setForm({ ...warehouse });
    setModalOpen(true);
  };

  const submit = (event) => {
    event.preventDefault();
    saveWarehouse({ ...form, id: editingWarehouse?.id });
    setModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {!canEdit ? <PermissionBanner message="Staff role: warehouses are view-only." /> : null}

      <div className="flex justify-end">
        <button
          type="button"
          disabled={!canEdit}
          onClick={openCreate}
          className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-sky-700 disabled:opacity-40"
        >
          Add Warehouse
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {warehouses.map((warehouse) => (
          <article key={warehouse.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800">{warehouse.name}</h3>
              <button
                type="button"
                disabled={!canEdit}
                onClick={() => openEdit(warehouse)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold disabled:opacity-40"
              >
                Edit
              </button>
            </div>
            <p className="flex items-start gap-2 text-sm text-slate-600">
              <FiMapPin className="mt-0.5 text-slate-400" />
              <span>{warehouse.location}</span>
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
              <FiUser className="text-slate-400" />
              <span>{warehouse.contactPerson}</span>
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
              <FiPhone className="text-slate-400" />
              <span>{warehouse.contactNumber}</span>
            </p>
          </article>
        ))}
      </div>

      <FormModal isOpen={isModalOpen} title={editingWarehouse ? "Edit Warehouse" : "Add Warehouse"} onClose={() => setModalOpen(false)}>
        <form className="grid gap-4" onSubmit={submit}>
          <Field label="Name" value={form.name} onChange={(value) => setForm((prev) => ({ ...prev, name: value }))} required />
          <Field
            label="Location"
            value={form.location}
            onChange={(value) => setForm((prev) => ({ ...prev, location: value }))}
            required
          />
          <Field
            label="Contact Person"
            value={form.contactPerson}
            onChange={(value) => setForm((prev) => ({ ...prev, contactPerson: value }))}
            required
          />
          <Field
            label="Contact Number"
            value={form.contactNumber}
            onChange={(value) => setForm((prev) => ({ ...prev, contactNumber: value }))}
            required
          />
          <div className="flex justify-end gap-2">
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

function Field({ label, value, onChange, required = false }) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-slate-700">
      {label}
      <input
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
      />
    </label>
  );
}
