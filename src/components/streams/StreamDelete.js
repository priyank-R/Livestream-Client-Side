import React from "react";
import Modal from "../Modal";
import { Link } from "react-router-dom";
import history from "../../history";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions/index";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  actions = () => {
    const id = this.props.match.params.id;
    return (
      <>
        <button
          onClick={() => this.props.deleteStream(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </>
    );
  };

  renderContent() {
    if (this.props.stream) {
      return (
        <b>
          Are you sure you want to delete the Stream :
          <u>{this.props.stream.title}</u> ?
        </b>
      );
    }
    return "Are you sure you want to delete the Stream ?";
  }

  render() {
    return (
      <Modal
        title="Delete stream"
        content={this.renderContent()}
        actions={this.actions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
