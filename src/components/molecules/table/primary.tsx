// src/components/molecules/table/primary.tsx
import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./default"; // Update the path as per your structure
import SkeletonLoader from "../skeleton/Skeleton";
import TableMobile from "./Mobile";
import { isClientWidthLg } from "@/components/utils/handleClientManitorSize";

interface Column {
  key: string; // The key to access data from the row
  header: string; // The title to be displayed in the header
  Cell?: (row: Record<string, any>) => React.ReactNode; // Custom render function for the cell (optional)
}

interface TablePrimaryProps {
  columns: Column[]; // Array of Column objects
  data: Array<Record<string, any>>;
  caption?: string;
  loading: boolean; // Loading state
}

const TablePrimary: React.FC<TablePrimaryProps> = ({
  columns,
  data,
  caption,
  loading,
}) => {
  const isLargerThanLg = isClientWidthLg();
  return (
    <>
      {isLargerThanLg ? (
        <Table className="border border-gray-200 table-auto">
          {caption && <TableCaption>{caption}</TableCaption>}
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className="p-2 border-b whitespace-nowrap"
                >
                  {column.header} {/* Use the header property here */}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: 5 }).map((_, rowIndex) => (
                  <TableRow key={rowIndex} className="hover:bg-gray-100">
                    {columns.map((_, colIndex) => (
                      <TableCell key={colIndex} className="p-2 border-b">
                        <SkeletonLoader />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : data.map((row, rowIndex) => (
                  <TableRow key={rowIndex} className="hover:bg-gray-100">
                    {columns.map((column, colIndex) => (
                      <TableCell key={colIndex} className="p-2 border-b">
                        {column.Cell ? column.Cell(row) : row[column.key]}{" "}
                        {/* Use the key for data access */}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      ) : (
        <>{loading ? <p>Loading...</p> : <TableMobile data={data} />}</>
      )}
    </>
  );
};

export default TablePrimary;
