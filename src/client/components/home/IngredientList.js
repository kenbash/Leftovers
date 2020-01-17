/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function IngredientList(props) {
  const { rows } = props;

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        Ingredient List
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className="ingredients-table">
          <Table stickyHeader>
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
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

IngredientList.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default IngredientList;
