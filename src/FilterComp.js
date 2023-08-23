import React from "react";

export default class FilterComp extends React.Component {
  render() {
    return (
      <section className="filterBar">
        <h2>Filter your Package here</h2>
        <input
          type="text"
          placeholder="Search with your Package Id..."
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </section>
    );
  }
}
