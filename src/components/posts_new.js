import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

  renderField(field) {
    const { meta: {touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <label><strong>{field.label} </strong></label>


        <input
          className="form-control"
          placeholder={field.place}
          type="text"
          {...field.input} //... object contact with field ( event handlers )
        />


      <div className="text-help">
        {touched && ((error && <span>{error}</span>))}
      </div>
      </div>
    );
  }

onSubmit(values) {
  this.props.createPost(values, () => {
     this.props.history.push('/');
  });


}

  render() {
    const { handleSubmit } = this.props;
      return (
<div>
    <h3> Add New Post </h3>

      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          place="Title"
          name = "title"
          component={ this.renderField } //component help to show field on the screen and that return JSX
        />

        <Field
          label="Categories"
          place="Categories"
          name = "categories"
          component={ this.renderField } //component help to show field on the screen and that return JSX
        />

        <Field
          label="Post Content"
          place="Write your content"
          name = "content"
          component={ this.renderField } //component help to show field on the screen and that return JSX
        />

       <button type="submit" className="btn btn-primary">Submit</button>
       <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>


</div>

    );
  }
}


function validate (values) {
  const errors = {};

// for dynamic error display then do intitalize with fields
// const FIELDS = {
//   title: {
//     type: 'input',
//     label: 'Title for post'
//   }, and so on..
//
// }
//_.each(FIELDS, (type,field) => {
// if( !values.[field]) {
//   errors[field] =`Enter a ${field}`
// }
// });


if(!values.title) {
  errors.title = "Enter a title please!";
}

else if(values.title.length < 3) {
    errors.title = "Title must be at least 3 characters!";
}

if(!values.categories) {
  errors.categories = "Enter some Categories!";
}

if(!values.content) {
  errors.content = "Enter some Content please!";
}

  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null,{ createPost }) (PostsNew)
);
