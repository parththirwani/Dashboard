import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";

// Define interfaces for the columns and data
interface Column {
  title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
  field: string;
  hiddenOnSmall: boolean;
  className?: string;
}

interface Row {
  [key: string]: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
  highlight: boolean;
}

interface ProjectsProps {
  columns: Column[];
  data: Row[];
}

export default function Projects({ columns, data }: ProjectsProps) {
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders from your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="bg-neutral-950 text-white">
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index} className={column.hiddenOnSmall ? "hidden sm:table-cell" : ""}>
                  {column.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} className={row.highlight ? "bg-accent" : ""}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} className={`${column.hiddenOnSmall ? "hidden sm:table-cell" : ""} ${column.className ?? ""}`}>
                    {column.field === "status" ? (
                      <Badge className="text-xs" variant={row[column.field] === "Fulfilled" ? "secondary" : "outline"}>
                        {row[column.field]}
                      </Badge>
                    ) : (
                      row[column.field]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// Example usage of the Projects component
const columns: Column[] = [
  { title: "Customer", field: "customerName", hiddenOnSmall: false },
  { title: "Email", field: "customerEmail", hiddenOnSmall: true },
  { title: "Type", field: "type", hiddenOnSmall: true },
  { title: "Status", field: "status", hiddenOnSmall: true },
  { title: "Date", field: "date", hiddenOnSmall: true },
  { title: "Amount", field: "amount", hiddenOnSmall: false, className: "text-right" },
];

const data: Row[] = [
  {
    customerName: "Liam Johnson",
    customerEmail: "liam@example.com",
    type: "Sale",
    status: "Fulfilled",
    date: "2023-06-23",
    amount: "$250.00",
    highlight: true
  },
  {
    customerName: "Olivia Smith",
    customerEmail: "olivia@example.com",
    type: "Refund",
    status: "Declined",
    date: "2023-06-24",
    amount: "$150.00",
    highlight: false
  },
  {
    customerName: "Noah Williams",
    customerEmail: "noah@example.com",
    type: "Subscription",
    status: "Fulfilled",
    date: "2023-06-25",
    amount: "$350.00",
    highlight: false
  },
  {
    customerName: "Emma Brown",
    customerEmail: "emma@example.com",
    type: "Sale",
    status: "Fulfilled",
    date: "2023-06-26",
    amount: "$450.00",
    highlight: false
  }
];

// Render the Projects component
<Projects columns={columns} data={data} />;
