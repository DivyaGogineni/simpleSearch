import React from "react";
import ReactDOM from "react-dom";
import Headings from "./Headings";
import Details from "./Details";
import FilterComp from "./FilterComp";
import Footer from "./Footer";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      packageInfo: [],
      Employee: "",
      work_by_order: 0,
      search: "",
      isFetching: true,
      // showDetail: false
    };
fetch("/json/packageInfo.json")
      .then((res) => res.json())
      .then((data) => {
        let dataArray = [data];
        dataArray[0].packages.sort(
          (a, b) => a.deadline - b.deadline
        );
        this.setState({ packageInfo: dataArray[0] , showDetail:false});
      })
      .then(() => stateUpdateTwo());

    let stateUpdateTwo = () => {
      fetch("/json/empDetail.json")
        .then((res) => res.json())
        .then((data) => this.setState({ Employee: data, isFetching: false }));
    };
  }
  filterSearch = (event) => {   
    this.setState({ search: event.target.value });
    // this.state.packageInfo?.map((link) =>
    // console.log("loggg****"+ link) 
    // );
    //console.log("*********" + listItems);
    /*console.log(event.target.value.substring(0, 30), "this is my input"); 
    if((this.state.search)== (event.target.value)){      
      this.setState({ showDetail: true });
    }else{
      this.setState({ showDetail: false });
    }
    console.log(this.state.search, "this is my search");
    console.log(this.state.packageInfo, "***********this is my search");*/
  };

  render() {
    //console.log(this.state.packageInfo.packages, "These are my packages");
    return (
      <React.Fragment>
        <div className="stickyFooterWrapper">
          {this.state.isFetching ? (
            <div id="loadingScreen">
              <p>Loading...</p>
            </div>
          ) : (
            <React.Fragment>
              <Headings />
              <section id="controls">
              <FilterComp
                  onChange={this.filterSearch.bind(this)}
                  value={this.state.search}
                /> 
              </section>
                {/* {this.state.showDetail? ( */}
                  <section id="ordersContainer">
                    {this.state.packageInfo.packages.map((packages) => (
                      <Details
                        key={packages.id}
                        data-workername={
                          this.state.Employee[packages.workerId].Employee.name
                        }
                        orderId={packages.id}
                        workOrderName={packages.name}
                        workOrderDescription={packages.description}
                        workOrderAmount={packages.amount}
                        workOrderworkerId={packages.workerId}
                        employeeImage={
                          this.state.Employee[packages.workerId].Employee.image
                        }
                        employeeName={
                          this.state.Employee[packages.workerId].Employee.name
                        }
                        employeecontact={
                          this.state.Employee[packages.workerId].Employee.contact
                        }
                        employeeEmail={
                          this.state.Employee[packages.workerId].Employee.email
                        }
                        deadline={packages.deadline}
                        search={this.state.search}
                      />
                    ))}
                  </section>               
                   {/* ):(
                   <div id="initailPage">
                         <p>Search for your order above to get the details......</p>
                   </div>
                 )} */}
            </React.Fragment>
          )}
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));