import { Applicant } from "@/models/Applicant";
import connectToDatabase from "@/lib/mongodb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await connectToDatabase();

  // Fetch applicants
  let applicants: any[] = [];
  try {
    applicants = await Applicant.find().sort({ appliedAt: -1 }).lean();
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="container mx-auto py-10 px-4 min-h-screen">
      <h1 className="text-3xl font-bold font-heading mb-8">Applicant Dashboard</h1>

      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-100">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Domain</TableHead>
              <TableHead>College</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applied At</TableHead>
              <TableHead>Links</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-zinc-500">
                  No applicants yet.
                </TableCell>
              </TableRow>
            ) : (
              applicants.map((app: any) => (
                <TableRow key={app._id.toString()}>
                  <TableCell className="font-medium">{app.name}<br /><span className="text-xs text-zinc-500">{app.email}</span></TableCell>
                  <TableCell>{app.domain}</TableCell>
                  <TableCell>{app.college}</TableCell>
                  <TableCell>
                    <Badge variant={app.status === 'Selected' ? 'default' : 'secondary'}>
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(app.appliedAt).toLocaleDateString()}</TableCell>
                  <TableCell className="space-x-2">
                    {app.linkedin && <a href={app.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>}
                    {app.github && <a href={app.github} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">GitHub</a>}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
