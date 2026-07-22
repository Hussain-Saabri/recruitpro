
import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from "@tanstack/react-table";

export default function DataTable({ data, columns, title, rightActions, icon, loading = false }) {
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Generate an array of 5 for skeleton rows
  const skeletonRows = Array(5).fill(0);

  return (
    <div className="w-full">
      {(title || rightActions) && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            {icon && <div className="text-brand-600 bg-brand-50 p-1.5 rounded-md">{icon}</div>}
            <h2 className="text-[15px] font-bold text-gray-900">{title}</h2>
          </div>
          {rightActions && (
            <div className="flex items-center gap-2">
              {rightActions}
            </div>
          )}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm text-slate-600 whitespace-nowrap">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-slate-50/30 border-b border-gray-100">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 font-bold text-gray-900 text-[13px] capitalize tracking-wider text-left"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-100">
          {loading ? (
            skeletonRows.map((_, index) => (
              <tr key={`skeleton-${index}`} className="hover:bg-slate-50/10 transition-colors duration-150">
                {table.getAllColumns().map((column, colIndex) => (
                  <td key={`skeleton-cell-${colIndex}`} className="px-4 py-4 align-middle">
                    <div className="h-3.5 bg-slate-200 rounded animate-pulse w-3/4"></div>
                  </td>
                ))}
              </tr>
            ))
          ) : table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={table.getAllColumns().length} className="px-4 py-8 text-center text-slate-500">
                No data available
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/10 transition-colors duration-150">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
}
