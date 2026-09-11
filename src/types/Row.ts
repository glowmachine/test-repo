import type { RowData } from "./RowData";

export type Row = {
    [K in keyof RowData]: RowData[K]
};