import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  InputAdornment
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Meal from '../../types/Meal';
import './MealList.scss';

let timeoutHandler; // Used to buffer filter input

class MealList extends Component {
  static applyFilter = (meals, filter) => (
    filter ? meals.filter(meal => meal.name.toLowerCase().indexOf(filter) !== -1) : meals
  );

  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      rows: [],
      filter: ''
    };
  }

  componentDidMount() {
    fetch('/api/meal/all')
      .then(res => res.json())
      .then((res) => {
        this.updateData(res);
      });
  }

  updateData(meals) {
    const { filter } = this.state;
    const rows = this.constructor.applyFilter(meals, filter);
    this.setState({ meals, rows });
  }

  updateFilter(value) {
    if (timeoutHandler) {
      clearTimeout(timeoutHandler);
    }
    timeoutHandler = setTimeout(() => {
      const { meals } = this.state;
      const filter = value.trim().toLowerCase();
      const rows = this.constructor.applyFilter(meals, filter);
      this.setState({ rows, filter });
      timeoutHandler = null;
    }, 250);
  }

  render() {
    const { rightcb, leftcb } = this.props;
    const { rows, filter } = this.state;

    return (
      <Container className="meal-list-wrapper">
        <Paper elevation={2} className="paper-wrapper">
          <div className="button-wrapper">
            <Button color="primary" variant="contained" size="large" onClick={leftcb} startIcon={<HomeIcon />}>
              Home
            </Button>
            <Button color="primary" variant="contained" size="large" startIcon={<AddIcon />}>
              Add Meal
            </Button>
          </div>
          <MealTable rows={rows} onRowClick={rightcb} filter={filter} onFilterChange={val => this.updateFilter(val)} />
        </Paper>
      </Container>
    );
  }
}

const columns = [
  { id: 'name', label: 'Name', minWidth: 150 },
  {
    id: 'servings',
    label: 'Servings',
    align: 'right',
    minWidth: 50
  }
  // { id: 'breakfast', label: 'Breakfast', minWidth: 50 },
  // { id: 'lunch', label: 'Lunch', minWidth: 50 },
  // { id: 'dinner', label: 'Dinner', minWidth: 50 }
];

function MealTable(props) {
  const {
    rows,
    onRowClick,
    filter,
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
    setFilter(event.target.value);
    onFilterChange(event.target.value);
  };

  if ((rows.length <= 0 && page !== 0) || (rows.length > 0 && rows.length <= page * rowsPerPage)) {
    setPage(0);
  }

  return (
    <div className="table-wrapper">
      <TextField
        className="meal-search"
        placeholder="Search"
        value={filterValue}
        onChange={handleFilterChange}
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
                key={row.code}
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
        backIconButtonProps={{
          'aria-label': 'previous page'
        }}
        nextIconButtonProps={{
          'aria-label': 'next page'
        }}
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

MealList.propTypes = {
  rightcb: PropTypes.func.isRequired,
  leftcb: PropTypes.func.isRequired
};

export default MealList;
