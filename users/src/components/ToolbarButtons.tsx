import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add'
import SaveIcon from '@material-ui/icons/Save';

const styles = (theme: any) => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

function ToolbarButtons(props: any) {
  const { classes, enterCreateMode } = props;
  return (
    <div>
      <Button variant="contained" size="small" color="secondary" className={classes.button}>
      <DeleteIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
        Delete
      </Button>
      <Button variant="contained" size="small"color="primary" className={classes.button}
        onClick={enterCreateMode}>
      <AddIcon className={classNames(classes.leftIcon, classes.iconSmall)}/>
        Create
      </Button>
      <Button variant="contained" size="small" className={classes.button}>
        <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
        Save
      </Button>
    </div>
  );
}

ToolbarButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToolbarButtons);