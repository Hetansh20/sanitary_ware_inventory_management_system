import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export function exportToCsv(filename, rows) {
  if (!rows.length) return;

  const headers = Object.keys(rows[0]);
  const csv = [headers.join(",")]
    .concat(rows.map((row) => headers.map((header) => escapeCsv(String(row[header] ?? ""))).join(",")))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  saveAs(blob, `${filename}.csv`);
}

export function exportToExcel(filename, rows, sheetName = "Report") {
  if (!rows.length) return;

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  const output = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  saveAs(new Blob([output], { type: "application/octet-stream" }), `${filename}.xlsx`);
}

export function printRows(title, rows) {
  const popup = window.open("", "_blank", "width=900,height=700");
  if (!popup) return;

  const headers = rows.length ? Object.keys(rows[0]) : [];
  const table = `
    <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:12px;">
      <thead>
        <tr>${headers.map((header) => `<th style=\"border:1px solid #ddd;padding:8px;text-align:left;background:#f8fafc;\">${header}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${rows
          .map(
            (row) =>
              `<tr>${headers
                .map((header) => `<td style=\"border:1px solid #ddd;padding:8px;\">${String(row[header] ?? "")}</td>`)
                .join("")}</tr>`
          )
          .join("")}
      </tbody>
    </table>
  `;

  popup.document.write(`<html><head><title>${title}</title></head><body><h2>${title}</h2>${table}</body></html>`);
  popup.document.close();
  popup.focus();
  popup.print();
}

function escapeCsv(value) {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
