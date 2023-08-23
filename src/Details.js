import React from "react";

export default class Details extends React.Component {
  // Formats the date deadline to the day month and year
  formatDMY(date) {
    var d = date;
    var day = d.getDate();
    var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    var year = d.getFullYear();

    var dateStr = day + "/" + month + "/" + year;
    return dateStr;
  }

  // Format the date deadline to the time of day
  formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  render() {
    return (
      //Compares the the employee string to the searchbox value to check if contains the values of the search state
      <div
        className={
          this.props.orderId
            .toString()
            .toLowerCase()
            .includes(this.props.search.toString().toLowerCase()) === true
            ? "orderTile"
            : "orderTile hide"
        }
      >
        <p className="orderName">{this.props.workOrderName}</p>
        <div className="employeeInfo">
          <img src={this.props.employeeImage} alt=""></img>
          <div className="employeeDetails">
            <p className="textHeading">Delivery Agent</p>
            <p>{this.props.employeeName}</p>
            <p className="textHeading">Agent Contact</p>
            <p>{this.props.employeecontact},</p>
            <p>{this.props.employeeEmail}</p>
          </div>
        </div>
        <div className="deadLine">
          <p>
            Estimated Delivery: {this.formatDMY(new Date(this.props.deadline))}
            &nbsp;
            <span className="noWrap">
              {this.formatAMPM(new Date(this.props.deadline))}
            </span>
          </p>
        </div>
        <div className="orderInfo">
          <p className="orderTitle">Order Details</p>
          <p className="orderCopy">{this.props.workOrderDescription} <span className="orderRate">Paid: {this.props.workOrderAmount}</span></p>
        </div>
      </div>
    );
  }
}
