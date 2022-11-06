import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@material-ui/core/Paper";

import TableSortLabel from "@mui/material/TableSortLabel";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
    [`&.${tableCellClasses.body} ,:hover > *`]: {
        backgroundColor: "#7B7B7B",
        color: "#ffffff",
    },
}));
const StyledTableSortLabel = styled(TableSortLabel)(({ theme }) => ({
    root: {
        // backgroundColor: "#ffffff",
        color: "#ffffff",
        "&:hover": {
            backgroundColor: "#ffffff",
            color: "#ffffff",
            "&& $icon": {
                opacity: 1,
                color: "#ffffff",
            },
        },
        "&$active": {
            backgroundColor: "#ffffff",
            color: "#ffffff",
            "&icon": {
                opacity: 1,
                color: "#ffffff",
            },
        },
    },
    active: { color: "#ffffff" },
    icon: {
        color: "white !important",
    },
}));
var reA = /[^a-zA-Z]/g;
var reN = /[^0-9]/g;

const sortAlphaNum = (a, b) => {
    var aA = a.replace(reA, "");
    var bA = b.replace(reA, "");
    if (aA === bA) {
        var aN = parseInt(a.replace(reN, ""), 10);
        var bN = parseInt(b.replace(reN, ""), 10);
        return aN === bN ? 0 : aN > bN ? 1 : -1;
    } else {
        return aA > bA ? 1 : -1;
    }
};

const descendingComparator = (a, b, orderBy) => {
    // // console.log(a, b, orderBy);
    return sortAlphaNum(a[orderBy].toString(), b[orderBy].toString());
};

const getComparator = (order, orderBy) => {
    // console.log(order, orderBy);
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
};

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
};

const MyTable = ({ titles, dataSet }) => {
    // console.log(titles, dataSet);
    const [orderBy, setOrderBy] = useState("name");
    const [order, setOrder] = useState("asc");

    const handleRequestSort = (event, property) => {
        // console.log(property);
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    };
    return (
        <TableContainer component={Paper}>
            <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
            >
                <TableHead>
                    <StyledTableRow>
                        {titles.map((title, index) => (
                            <StyledTableCell key={title + index} align="center">
                                <StyledTableSortLabel
                                    active={orderBy === title.toLowerCase()}
                                    direction={
                                        orderBy === title.toLowerCase()
                                            ? order
                                            : "asc"
                                    }
                                    onClick={createSortHandler(
                                        title.toLowerCase()
                                    )}
                                >
                                    {title}
                                </StyledTableSortLabel>
                            </StyledTableCell>
                        ))}
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {stableSort(dataSet, getComparator(order, orderBy)).map(
                        (data, index) => (
                            <StyledTableRow
                                key={data.name + index}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <StyledTableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                >
                                    {data.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {data.subject}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {data.score}
                                </StyledTableCell>
                            </StyledTableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MyTable;
