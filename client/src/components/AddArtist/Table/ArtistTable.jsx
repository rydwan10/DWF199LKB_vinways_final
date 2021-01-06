import Row from "./Row/Row";
import makeStyles from "./style";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@material-ui/core";

function ArtistTable({ artists, handleEdit, handleDelete }) {
  const classes = makeStyles();

  return (
    <>
      <Typography
        style={{
          color: "#03F387",
          fontWeight: "bold",
          margin: "3rem 0 1rem 0",
        }}
        variant="h5"
      >
        Artist List
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead className={classes.tableHeading}>
            <TableRow>
              <TableCell className={classes.tableCell} width={2}>
                No.{" "}
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                Name
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                Old
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                Category
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                Start Career
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                Thumbnail
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                {" "}
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {artists.map((artist, index) => (
              <Row
                key={artist.id}
                index={index}
                artist={artist}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ArtistTable;
