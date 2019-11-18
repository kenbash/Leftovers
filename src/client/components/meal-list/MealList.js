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
  TableRow
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import Meal from '../../types/Meal';
import './MealList.scss';

class MealList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: []
    };
  }

  componentDidMount() {
    fetch('/api/meal/all')
      .then(res => res.json())
      .then((res) => {
        this.setState({ meals: res });
      });
  }

  render() {
    const { rightcb, leftcb } = this.props;
    const { meals } = this.state;

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
          <MealTable rows={meals} onRowClick={rightcb} />
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
  const { rows, onRowClick } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="table-wrapper">
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
                style={{ cursor: 'pointer' }}
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
        rowsPerPageOptions={[10, 25, 100]}
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
  onRowClick: PropTypes.func.isRequired
};

MealList.propTypes = {
  rightcb: PropTypes.func.isRequired,
  leftcb: PropTypes.func.isRequired
};

export default MealList;
