import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Loader from "../../components/Loader/Loader";
import SideDrawer from "../Drawer/SideDrawer";
import moment from "moment";

import { getAllOrders } from "../../actions/orderAction";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .green-text": {
      color: "green",
    },

    "& .orange-text": {
      color: "orange",
    },

    "& .red-text": {
      color: "red",
    },
  },
  create: {
    height: 32,
  },
  icon: {
    marginLeft: 5,
    "& .MuiSvgIcon-root": {
      widthL: 15,
      height: 15,
      color: "#4285f4",
    },
  },
  tableContainer: {
    paddingTop: 25,
  },
}));

function AdminOrder() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { orderData, loading, error } = useSelector((state) => state.orders);
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  const statusColor = (status) => {
    switch (status) {
      case "success":
        return "green-text";
        break;

      case "pending":
        return "orange-text";
        break;

      case "failed":
        return "red-text";
        break;

      default:
        return "";
    }
  };

  const mdbJobs = () => {
    const data = {
      columns: [
        {
          label: "userID",
          field: "userid",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "OrderID",
          field: "orderid",
          sort: "asc",
        },
        {
          label: "PricePaid",
          field: "price",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Date",
          field: "date",
          sort: "asc",
        },
      ],
      rows: [],
    };

    console.log("hh", orderData);

    orderData.forEach((order) => {
      data.rows.push({
        userid: order.userId._id,
        email: order.userId.email,
        orderid: order.razorpayOrderID,
        price: order.pricepaid,
        status: <p className={statusColor(order.status)}>{order.status}</p>,
        date: moment(order.createdAt).format("DD MMMM YYYY"),
      });
    });

    return data;
  };

  if (loading) return <Loader />;

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12} md={2}>
          <SideDrawer />
        </Grid>
        <Grid className={classes.tableContainer} item xs={12} md={10}>
          <Grid container justify="center">
            <Grid item xs={12} md={10}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <h1>All Transactions</h1>
              </Box>

              <MDBDataTable data={mdbJobs()} bordered striped hover />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default AdminOrder;
