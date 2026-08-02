
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
    <div className="w-full flex flex-col relative">
      {(title || rightActions) && (
        <div className="flex flex-row items-center justify-between p-4 gap-4 border-b border-gray-100">
           <div className="flex items-center gap-2">
            {icon && <div className="text-brand-600   ">{icon}</div>}
            <p className="text-[15px] font-bold text-gray-900">{title}</p>
          </div>
          {rightActions && (
            <div className="flex items-center gap-2">
              {rightActions}
            </div>
          )}
        </div>
      )}
      <div className="overflow-x-auto overflow-y-hidden w-full cursor-pointer">
        <table className="w-full border-collapse text-sm text-slate-600 whitespace-nowrap cursor-default">
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
              <tr key={`skeleton-${index}`} className="hover:bg-slate-50/10 transition-colors duration-150 border-b border-gray-100 last:border-0">
                {table.getAllColumns().map((column, colIndex) => (
                  <td key={`skeleton-cell-${colIndex}`} className="px-4 py-3.5 align-middle">
                    <div className="flex items-center gap-3">
                      {colIndex === 0 && <div className="h-8 w-8 rounded-full bg-slate-200/50 animate-pulse shrink-0"></div>}
                      <div className="flex flex-col gap-2 w-full">
                        <div className={`h-3 bg-slate-200/60 rounded-md animate-pulse ${colIndex === 0 ? 'w-24' : 'w-3/4'}`}></div>
                        {colIndex === 0 && <div className="h-2.5 bg-slate-100/80 rounded-md animate-pulse w-32 mt-0.5"></div>}
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))
          ) : table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={table.getAllColumns().length} className="h-14 text-center align-middle">
                <span className="text-slate-500 text-[13px] font-medium">No data available</span>
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
