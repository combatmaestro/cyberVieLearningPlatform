import { useLoading } from "@agney/react-loading";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh",
  },
}));

export default function Loader() {
  const classes = useStyles();
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    loaderProps: {
      style: { color: "#3f51b5" },
    },
  });

  return (
    <>
      <Container className={classes.root}>
        <section {...containerProps}>{indicatorEl}</section>
      </Container>
    </>
  );
}
