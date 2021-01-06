import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

// components
import Row from "./Row/Row";
import makeStyles from "./style";

function TransactionTable({ transactions, handleApprove, handleCancel }) {
  const classes = makeStyles();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead className={classes.tableHeading}>
          <TableRow>
            <TableCell className={classes.tableCell} width={2}>
              No.{" "}
            </TableCell>
            <TableCell className={classes.tableCell} align="right">
              Users
            </TableCell>
            <TableCell className={classes.tableCell} align="right">
              Bukti Transfer
            </TableCell>
            <TableCell className={classes.tableCell} align="right">
              Remaining Active
            </TableCell>
            <TableCell className={classes.tableCell} align="right">
              Status User
            </TableCell>
            <TableCell className={classes.tableCell} align="right">
              Status Payment
            </TableCell>
            <TableCell className={classes.tableCell} align="right">
              {" "}
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction, index) => (
            <Row
              handleApprove={handleApprove}
              handleCancel={handleCancel}
              index={index}
              key={transaction.id}
              transaction={transaction}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransactionTable;
