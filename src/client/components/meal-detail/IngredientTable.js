/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

function MealTable(props) {
  const { rows } = props;

  return (
    <div className="ingredients-table">
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell key="ingredients">
              Ingredients
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              tabIndex={-1}
              key={i}
              className="meal-row"
            >
              <TableCell key="ingredients">
                {row}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

MealTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MealTable;
