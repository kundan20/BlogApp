import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  componentDidMount() {
    if(!this.props.post) {
    const {id} = this.props.match.params;
    this.props.fetchPost(id);
    }
  }
  //
  // helperFunction() {
  //   this.props.posts[this.props.match.params.id];
  // }

onDeleteClick() {
  const { id } = this.props.match.params;

    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
}

  render() {
  // this.props.match.params.id;
  const { post } = this.props;

  if(!post) {
    return <div>Loading...</div>;
  }

    return(
      <div>
        <Link to="/">Back to Home</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        > Delet Post
        </button>
        <h3>Title: {post.title} </h3>
        <h6><strong>Categories: {post.categories}</strong> </h6>
        <p>{post.content} </p>
      </div>
    );
  };
}

 function mapStateToProps({ posts }, ownProps) {
   return { post: posts[ownProps.match.params.id] };

 }
export default connect( mapStateToProps, { fetchPost, deletePost })(PostsShow);
