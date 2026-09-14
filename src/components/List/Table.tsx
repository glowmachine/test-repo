import type { Legislator } from "../../types/LegislatorSchema";
import { useDataContext } from "../../contexts/DataContext";
import { useTableContext } from "../../contexts/TableContext";
import { useMemo, useRef, useState } from "react";
import getRowData from "./getRowData";
import sortRows from "./sortRows";
import filterData from "./filterData";
import ColumnSelector from "./ColumnSelector";
import TableRow from "./TableRow";
import type { RowData } from "../../types/RowData";
import ToTopButton from "../ToTopButton";

const buttonStyle = 'outline h-10 w-10 flex items-center justify-center rounded-full hover:cursor-pointer hover:hover:bg-zinc-200 dark:hover:bg-zinc-700';

export default function Table() {
    const { legislators, isLoading, error } = useDataContext();
    const { columns, sortBy, setSortBy, filterOptions } = useTableContext();
    const [colSelectOpen, setColSelectOpen] = useState(false);
    const scrollableDiv = useRef<HTMLDivElement>(null);

    const rows = useMemo<RowData[]>(() => {
        if (!legislators) return [];
        const filteredData: Legislator[] = filterData(legislators, filterOptions);
        let rowData: RowData[] = getRowData(filteredData);
        rowData = sortRows(rowData, sortBy.key, sortBy.asc);
        return rowData;
    }, [legislators, columns, sortBy, filterOptions]);

    // type PaginationSettings = {
    //     rowsPerPage: number,
    //     index: number,
    // }
    // const defaultPageSettings = { rowsPerPage: 25, index: 0 };
    // const [pageSettings, setPageSettings] = useState<PaginationSettings>(defaultPageSettings);
    // const pageStart: number = pageSettings.index + 1;
    // const pageEnd: number = pageSettings.index + pageSettings.rowsPerPage <= rows.length
    //     ? pageSettings.index + pageSettings.rowsPerPage
    //     : rows.length;
    // useEffect(() => {
    //     setPageSettings(defaultPageSettings);
    // }, [rows]);

    return (<>
        {colSelectOpen && <ColumnSelector colSelectOpen={colSelectOpen} setColSelectOpen={setColSelectOpen} />}
        {isLoading && <div className='h-full grid place-content-center
                text-3xl text-zinc-600 dark:text-zinc-300'>Loading Database</div>}
        {error && <div className='h-full grid place-content-center
                text-2xl text-red-500'>{error.message}</div>}
        {(!isLoading && !error) && <div className='relative min-w-0 h-full overflow-auto px-5 pb-5
            bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
            ref={scrollableDiv}>
            <ToTopButton div={scrollableDiv} style={buttonStyle} />
            <div className='sticky left-0 w-full h-12 pl-2 flex items-center gap-1'>
                <h1 className='text-3xl'>Legislators</h1>
                <span>({rows.length})</span>
                <div className='flex gap-5 ml-auto'>
                    {/* <div id='page-controls' className='self-end flex items-center gap-2'>
                        {rows.length === 0
                            ? <span>0-0 of 0</span>
                            : <span>
                                {pageStart}-{pageEnd} of {rows.length}
                            </span>}
                        <button
                            className={buttonStyle}
                            disabled={pageSettings.index === 0}
                            onClick={() => setPageSettings(p =>
                                ({ ...p, index: p.index - p.rowsPerPage }))}>
                            ←</button>
                        <button
                            className={buttonStyle}
                            disabled={pageSettings.index + pageSettings.rowsPerPage >= rows.length}
                            onClick={() => setPageSettings(p =>
                                ({ ...p, index: p.index + p.rowsPerPage }))}>
                            →</button>
                    </div> */}
                    <button className={`${buttonStyle} ${colSelectOpen ? 'bg-zinc-200' : ''}`}
                        onClick={() => setColSelectOpen(prev => !prev)}
                    >
                        <span className='material-symbols-outlined'
                            style={{ fontVariationSettings: `'FILL' ${colSelectOpen ? 1 : 0}` }}
                        >
                            view_column
                        </span>
                    </button>
                </div>
            </div>
            <table className='min-w-full'>
                <thead className='sticky -top-3 z-10 bg-white dark:bg-zinc-800'>
                    <tr>{columns.filter((c) => (c.selected)).map((col, index) =>
                        <th colSpan={index === 0 ? 2 : 1} key={col.key}>
                            <button
                                className='h-12 flex items-center gap-1 whitespace-nowrap w-full p-2
                                    border-b-1 font-medium
                                    border-zinc-400 dark:border-zinc-400
                                    text-zinc-400 dark:text-zinc-500
                                    hover:text-black dark:hover:text-zinc-300'
                                onClick={() => setSortBy((prev) => {
                                    return (col.key === prev.key)
                                        ? { ...prev, asc: !prev.asc }
                                        : { key: col.key, asc: true }
                                })}
                            >
                                <span>{col.label}</span>
                                <span className={col.key !== sortBy.key ? 'invisible' : ''}>
                                    {sortBy.asc ? '▲' : '▼'}</span>
                            </button>
                        </th>)
                    }</tr>
                </thead>
                <tbody>
                    {rows &&
                        rows.map((row) =>
                            // (index >= pageSettings.index && index < pageSettings.index + pageSettings.rowsPerPage) &&
                            <TableRow row={row} key={row.bioguide} />
                        )}
                </tbody>
            </table>
        </div>}
    </>);
}