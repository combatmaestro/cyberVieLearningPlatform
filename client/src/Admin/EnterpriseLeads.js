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
  Grid,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SideDrawer from "../Drawer/SideDrawer"; // 👈 same as Assessment

const useStyles = makeStyles((theme) => ({
  root: {},
  tableContainer: {
    paddingTop: 25,
    paddingBottom: 40,
  },
  titleBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(3),
  },
}));

const EnterpriseLeads = () => {
  const classes = useStyles();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const handleChangePage = (event, newPage) => setPage(newPage);
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
    <Grid container className={classes.root}>
      {/* 🧭 Sidebar */}
      <Grid item xs={12} md={2}>
        <SideDrawer />
      </Grid>

      {/* 🧾 Main content */}
      <Grid className={classes.tableContainer} item xs={12} md={10}>
        <Grid container justify="center">
          <Grid item xs={12} md={10}>
            <Box className={classes.titleBar}>
              <Typography variant="h5">Enterprise Leads</Typography>
            </Box>

            {leads.length === 0 ? (
              <Typography color="textSecondary">No leads found.</Typography>
            ) : (
              <Paper elevation={2}>
                <TableContainer>
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
              </Paper>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EnterpriseLeads;
