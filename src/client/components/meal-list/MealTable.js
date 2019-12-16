import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  InputAdornment
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Meal from '../../types/Meal';
import './MealList.scss';

let timeoutHandler;
const columns = [
  { id: 'name', label: 'Name', minWidth: 150 },
  {
    id: 'servings',
    label: 'Servings',
    align: 'right',
    minWidth: 50
  }
];

// Used to buffer filter input
function handleBuffer(func) {
  if (timeoutHandler) {
    clearTimeout(timeoutHandler);
  }
  timeoutHandler = setTimeout(() => {
    timeoutHandler = null;
    func();
  }, 250);
}

function MealTable(props) {
  const {
    rows,
    filter,
    onRowClick,
    onFilterChange
  } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filterValue, setFilter] = React.useState(filter);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterChange = (event) => {
    const { value } = event.target;
    setFilter(value);
    handleBuffer(() => onFilterChange(value));
  };

  if ((rows.length <= 0 && page !== 0) || (rows.length > 0 && rows.length <= page * rowsPerPage)) {
    setPage(0);
  }

  return (
    <div className="meal-table-wrapper">
      <TextField
        className="meal-search"
        placeholder="Search"
        value={filterValue}
        onChange={handleFilterChange}
        inputProps={{ maxLength: 100 }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <div className="meal-table">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.name} // TODO: change to id
                onClick={() => onRowClick(row)}
                className="meal-row"
              >
                {columns.map(column => (
                  <TableCell key={column.id} align={column.align}>
                    {row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

MealTable.propTypes = {
  rows: PropTypes.arrayOf(Meal).isRequired,
  onRowClick: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default MealTable;
