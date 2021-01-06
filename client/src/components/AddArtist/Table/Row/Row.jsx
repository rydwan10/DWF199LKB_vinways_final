import { useState } from "react";
import { TableRow, TableCell, withStyles, Button } from "@material-ui/core";
import MoreHorizOutlined from "@material-ui/icons/MoreHorizOutlined";

// dropdown menu
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// style
import makeStyles from "./style";

export default function Row({ artist, index, handleEdit, handleDelete }) {
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
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // End of menu utility

  return (
    <>
      <TableRow className={`${classes.root} ${classes.tableHead}`}>
        <TableCell className={classes.tableCell} component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell className={classes.tableCell} align="right">
          {artist.name}
        </TableCell>
        <TableCell className={classes.tableCell} align="right">
          {artist.old}
        </TableCell>
        <TableCell className={classes.tableCell} align="right">
          {artist.category}
        </TableCell>
        <TableCell className={classes.tableCell} align="right">
          {artist.startCareer}
        </TableCell>
        <TableCell className={classes.tableCell} align="right">
          <img
            src={`http://localhost:5000/uploads/${artist.thumbnail}`}
            alt="thumbnail"
            width="64"
          />
          {/* {artist.thumbnail} */}
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
                onClick={() => handleEdit(artist)}
              >
                Edit
              </Button>
            </MenuItem>
            <MenuItem className={classes.menuItem} onClick={handleClose}>
              <Button
                style={{ color: "red" }}
                onClick={() => handleDelete(artist.id)}
              >
                Delete
              </Button>
            </MenuItem>
          </StyledMenu>
        </TableCell>
      </TableRow>
    </>
  );
}
