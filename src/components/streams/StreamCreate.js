import React, { Component } from "react";
import rand from "random-key";
import _ from "lodash";

import { connect } from "react-redux";
import { createStream, fetchStreams } from "../../actions/";
import StreamForm from "./StreamForm";

class StreamCreate extends Component {
  componentDidMount() {
    this.props.fetchStreams(); //returns an Object
  }

  onSubmit = (formValues) => {
    if (this.props.streams) {
      const key = this.generateUniqueStreamKey(this.props.streams)
      const data = { ...formValues, streamKey: key }
      console.log('data is',data)
    

    this.props.createStream(data);
    }
  };

  generateUniqueStreamKey = (streams) => {
    const key = rand.generate(5);

    const result = streams.filter((stream) => {
      return stream.streamKey === key;
    });

    console.log("result is", result);
    if (result.length === 0) {
      return key;
    }
    this.generateUniqueStreamKey(streams);
  };

  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: _.values(state.streams),
  };
};

export default connect(mapStateToProps, { createStream, fetchStreams })(
  StreamCreate
);
