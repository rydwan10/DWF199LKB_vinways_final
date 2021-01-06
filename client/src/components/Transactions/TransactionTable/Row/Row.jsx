import { useState } from "react";
import { TableRow, TableCell, withStyles, Button } from "@material-ui/core";
import MoreHorizOutlined from "@material-ui/icons/MoreHorizOutlined";

// dropdown menu
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// style
import makeStyles from "./style";

export default function Row({
  transaction,
  index,
  handleApprove,
  handleCancel,
}) {
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
          {transaction.user.fullName}
        </TableCell>
        <TableCell className={classes.tableCell} align="right">
          {transaction.proofOfTransaction}
        </TableCell>
        <TableCell className={classes.tableCell} align="right">
          {transaction.remainingActive}
        </TableCell>
        <TableCell
          className={`${classes.tableCell} ${
            transaction.user.status === "active"
              ? classes.greenText
              : classes.redText
          } `}
          align="right"
        >
          {transaction.user.status}
        </TableCell>
        <TableCell
          className={`${classes.tableCell} ${
            transaction.paymentStatus === "approved"
              ? classes.greenText
              : transaction.paymentStatus === "pending"
              ? classes.yellowText
              : classes.redText
          } `}
          align="right"
        >
          {transaction.paymentStatus}
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
                onClick={() => handleApprove(transaction.id)}
              >
                Approve
              </Button>
            </MenuItem>
            <MenuItem className={classes.menuItem} onClick={handleClose}>
              <Button
                style={{ color: "red" }}
                onClick={() => handleCancel(transaction.id)}
              >
                Cancel
              </Button>
            </MenuItem>
          </StyledMenu>
        </TableCell>
      </TableRow>
    </>
  );
}
