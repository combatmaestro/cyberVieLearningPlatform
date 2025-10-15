import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEnterpriseLeads } from "../actions/enterpriseLeadAction";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import SideDrawer from "../Admin/Drawer/SideDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  sidebar: {
    flexBasis: "30%", // 30% width
    maxWidth: "30%",
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tableContainer: {
    flexBasis: "70%", // 70% width
    maxWidth: "70%",
    padding: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
  },
}));

const EnterpriseLeads = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { leads = [], loading } = useSelector((state) => state.enterpriseLeads);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    dispatch(getAllEnterpriseLeads());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {/* Sidebar */}
      <div className={classes.sidebar}>
        <SideDrawer />
      </div>

      {/* Table Section */}
      <div className={classes.tableContainer}>
        <Paper className={classes.paper}>
          <Typography variant="h5" gutterBottom>
            Enterprise Leads
          </Typography>

          {leads.length === 0 ? (
            <Typography>No leads found.</Typography>
          ) : (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell><strong>Phone</strong></TableCell>
                    <TableCell><strong>Message</strong></TableCell>
                    <TableCell><strong>Created At</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leads
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((lead) => (
                      <TableRow key={lead._id}>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>{lead.phone}</TableCell>
                        <TableCell>{lead.message}</TableCell>
                        <TableCell>
                          {new Date(lead.createdAt).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>

              <TablePagination
                component="div"
                count={leads.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default EnterpriseLeads;
