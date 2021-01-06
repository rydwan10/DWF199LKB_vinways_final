import React from "react";
import { TableRow, TableCell, withStyles, Button } from "@material-ui/core";
import MoreHorizOutlined from "@material-ui/icons/MoreHorizOutlined";

// dropdown menu
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// style
import makeStyles from "./style";

export default function Row({ music, index, handleEdit, handleDelete }) {
  const musicYear = music.year.split("-");
  const year = musicYear[0];

  const classes = makeStyles();
  const StyledMenu = withStyles({
    paper: {
      backgroundColor: "#363954",
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ));

  // Menu utility
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // End of menu utility

  return (
    <React.Fragment>
      <TableRow className={`${classes.root} ${classes.tableHead}`}>
        <TableCell className={classes.tableCell} component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell className={classes.tableCell} align="right">
          {music.title}
        </TableCell>
        <TableCell className={classes.tableCell} align="right">
          {year}
        </TableCell>
        <TableCell className={classes.tableCell} align="right">
          {music.artist.name}
        </TableCell>
        <TableCell className={classes.tableCell} align="right">
          <img
            src={`http://localhost:5000/uploads/${music.thumbnail}`}
            alt="album thumbnail"
            width="54"
          />
        </TableCell>
        <TableCell className={classes.tableCell} align="right">
          {music.attachment}
        </TableCell>
        <TableCell className={classes.tableCell} align="right">
          <MoreHorizOutlined
            style={{ cursor: "pointer" }}
            onClick={handleClick}
          />
          <StyledMenu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem className={classes.menuItem} onClick={handleClose}>
              <Button
                style={{ color: "#08F387" }}
                onClick={() => handleEdit(music)}
              >
                Edit
              </Button>
            </MenuItem>
            <MenuItem className={classes.menuItem} onClick={handleClose}>
              <Button
                style={{ color: "red" }}
                onClick={() => handleDelete(music.id)}
              >
                Delete
              </Button>
            </MenuItem>
          </StyledMenu>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
