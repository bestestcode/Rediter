import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import { subredditsActions } from '../../store/subreddits';

export const checkEmpty = value => ((typeof value !== 'undefined' && value != null) ? undefined : 'Required Field');

export const renderField = ({
  input,
  label,
  type,
  defaultValue,
  disabled,
  meta: { touched, error, warning }
}) => (
  <div className={`input-field col s6 ${touched && error ? ' has-error' : ''}`}>
    <input id="titleInput" className="form-control validate" {...input} type={type} disabled={disabled} value={defaultValue} />
    <label htmlFor="titleInput">Title</label>
    {/* {<span className={`help-block${touched && error ? ' pop' : ''}`}>{error}</span> ||
    <span className={`help-block info${touched && warning ? ' pop' : ''}`}>{warning}</span> } */}
  </div>
);

export class SubredditForm extends React.Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <form name="form" onSubmit={handleSubmit}>
          <Field name="title" component={renderField} type="text" validate={[checkEmpty]} label="Title" />
          <button className="btn">Submit</button>
          <Link to="/subreddits"><span className="btn-flat">Cancel</span></Link>
        </form>
      </div>
    );
  }
}

const createReduxForm = reduxForm({ form: 'Add' });

export default connect(
  (state) => {
    const { adding } = state.subreddits;
    return {
      adding,
    };
  },
  dispatch => bindActionCreators(subredditsActions, dispatch),
)(createReduxForm(SubredditForm));
