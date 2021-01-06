import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// components
import Row from "./Row/Row";
import makeStyles from "./style";
import { Typography } from "@material-ui/core";

function MusicTable({ musics, handleEdit, handleDelete }) {
  const classes = makeStyles();

  return !musics.length ? (
    <div
      style={{
        borderRadius: "1rem",
        background: "#21243C",
        color: "#03F387",
        fontFamily: "Nunito",
        fontSize: "2rem",
        display: "flex",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <span>There is no music yet</span>
    </div>
  ) : (
    <>
      <Typography
        style={{
          color: "#03F387",
          fontWeight: "bold",
          margin: "3rem 0 1rem 0",
        }}
        variant="h5"
      >
        Music List
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead className={classes.tableHeading}>
            <TableRow>
              <TableCell className={classes.tableCell} width={2}>
                No.{" "}
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                Title
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                Year
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                Artist
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                Thumbnail
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                Attachment
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                {" "}
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {musics.map((music, index) => (
              <Row
                key={music.id}
                index={index}
                music={music}
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

export default MusicTable;
