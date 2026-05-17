import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { COPY } from "@/lib/copy";
import type { Company, RequiredDocument } from "@/lib/types";

type DocumentRequirementsTableProps = {
  documents: RequiredDocument[];
  companies: Company[];
};

export function DocumentRequirementsTable({
  documents,
  companies,
}: DocumentRequirementsTableProps) {
  const companyMap = new Map(
    companies.map((c) => [c.id, c.name])
  );

  return (
    <div className="overflow-x-auto rounded-xl border border-fz-border bg-fz-surface shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <Table>
        <caption className="mb-4 text-left text-sm font-medium text-fz-ink">
          {COPY.table.caption}
        </caption>
        <TableHeader>
          <TableRow>
            <TableHead>{COPY.table.label}</TableHead>
            <TableHead>{COPY.table.type}</TableHead>
            <TableHead>{COPY.table.company}</TableHead>
            <TableHead>{COPY.table.priority}</TableHead>
            <TableHead>{COPY.table.status}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell className="font-medium">
                {doc.label ?? COPY.common.notAvailable}
              </TableCell>
              <TableCell>
                {COPY.docType[doc.docType] ?? doc.docType}
              </TableCell>
              <TableCell>
                {companyMap.get(doc.companyId) ?? doc.companyId}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="border-fz-border">
                  {COPY.priority[doc.priority] ?? doc.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <StatusBadge status={doc.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
