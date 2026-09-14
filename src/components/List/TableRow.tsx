import { useTableContext } from "../../contexts/TableContext";
import type { Row } from "../../types/Row";
import { NavLink } from "react-router";
import buildLink from "./buildLink";

interface TableRowProps { row: Row }
export default function TableRow({ row }: TableRowProps) {
    const { columns } = useTableContext();

    return (
        <tr className='transition-[background-color] duration-300
                hover:bg-zinc-100 dark:hover:bg-zinc-700
                *:p-2 *:whitespace-nowrap'
            key={row.bioguide}>
            <td className='w-0'>
                <NavLink to={`/details/${row.bioguide}`}>
                    <div className='bg-black size-10 rounded-full overflow-hidden'>
                        <img alt={`Flag of ${row.state}`}
                            loading='lazy'
                            decoding='async'
                            src={`/flags/Flag_of_${row.state}.svg`}
                            onError={e => e.currentTarget.style.display = 'none'}
                            onLoad={e => e.currentTarget.classList.remove('opacity-0')}
                            className='object-cover w-full h-full opacity-0 transition-opacity duration-300 ease-out'
                        />
                    </div>
                </NavLink>
            </td>
            {columns.filter((c) => (c.selected)).map((col) => {
                const value = row[col.key];
                const link = buildLink(col.key, row);

                if (col.key === 'name')
                    return <td key={col.key}>
                        <NavLink to={`/details/${row.bioguide}`} className='hover:underline'>
                            {value}
                        </NavLink>
                    </td>
                else if (value === 0 || value) {
                    return <td key={col.key}>
                        {link
                            ? <a href={link} target='_blank' rel='noopener noreferrer'
                                className='inline-flex gap-1 items-center
                                    hover:text-red-500
                                    *:invisible hover:*:visible'>
                                {value} <span className='material-symbols-outlined !text-lg'>
                                    open_in_new</span>
                            </a>
                            : <p>{String(value)}</p>
                        }
                    </td>
                }
                else {
                    return <td key={col.key}></td>
                }
            })}
        </tr >
    )
}