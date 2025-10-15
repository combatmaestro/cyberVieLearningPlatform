import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  TableContainer,
  TablePagination,
} from "@material-ui/core";

const EnterpriseLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // 👈 default rows per page

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const { data } = await axios.get(
          "https://cyber-vie-learning-platform-client-ten.vercel.app/user/admin/enterprise-leads",
          { withCredentials: true }
        );
        setLeads(data.leads || []);
      } catch (error) {
        console.error("❌ Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  const paginatedLeads = leads.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper style={{ padding: "24px", marginTop: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Enterprise Leads
      </Typography>

      {leads.length === 0 ? (
        <Typography color="textSecondary">No leads found.</Typography>
      ) : (
        <>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell><strong>#</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Phone</strong></TableCell>
                  <TableCell><strong>Message</strong></TableCell>
                  <TableCell><strong>Created At</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedLeads.map((lead, index) => (
                  <TableRow key={lead._id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{lead.email || "—"}</TableCell>
                    <TableCell>{lead.phone || "—"}</TableCell>
                    <TableCell>{lead.message || "—"}</TableCell>
                    <TableCell>
                      {lead.createdAt
                        ? new Date(lead.createdAt).toLocaleString()
                        : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* 📄 Pagination controls */}
          <TablePagination
            component="div"
            count={leads.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            labelRowsPerPage="Rows per page:"
          />
        </>
      )}
    </Paper>
  );
};

export default EnterpriseLeads;
