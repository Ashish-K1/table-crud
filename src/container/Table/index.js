import React from 'react';
import { data } from 'dummy.js';
import PopUp from 'component/popup.js';
import 'assets/table.css';

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: data,
      addDataPopover: false,
      newEntry: {},
    };
  }

  parsedata = (data) => {
    if (typeof data == 'object') {
      return Object.values(data).join('');
    }
    return data;
  };

  addTableData = () => {
    this.setState({ addDataPopover: true });
  };

  handleClose = () => {
    this.setState({ addDataPopover: false }, this.setState({ newEntry: {} }));
  };

  addEntry = () => {
    const { newEntry, tableData } = this.state;
    const freshData = [...tableData, newEntry];
    this.setState({ tableData: freshData }, () => this.handleClose());
  };

  popupcontent = (tableHeader) => {
    const { newEntry } = this.state;
    const entry = { ...newEntry };
    const enterElement = (value, name) => {
      entry[name] = value;
      this.setState({ newEntry: entry });
    };
    return (
      <div>
        {tableHeader &&
          tableHeader.map((h) => (
            <div>
              <span>{h}</span>
              <input
                onChange={(e) => enterElement(e.target.value, h)}
                name={h}
                value={newEntry[h] && newEntry[h]}
              />
            </div>
          ))}
        <button
          className="create-button"
          onClick={() => this.addEntry()}
          disabled={Object.keys(newEntry).length == 0}
        >
          Add Entry
        </button>
      </div>
    );
  };

  deleteEntries = (row) => {
    const { tableData } = this.state;
    const index = tableData.findIndex((t) => t === row);
    if (index > -1) {
      const newData = [...tableData];
      newData.splice(index, 1);
      this.setState({ tableData: newData });
    }
  };

  render() {
    const { tableData, addDataPopover } = this.state;
    const tableHeader = tableData.length > 0 ? Object.keys(tableData[0]) : [];
    return (
      <>
        <div className="create-button">
          <button onClick={() => this.addTableData()}>Create</button>
        </div>
        <div className="table-container">
          <table>
            <tr className="table-header">
              {tableHeader &&
                tableHeader.map((h) => <th className="table-header">{h}</th>)}
            </tr>
            {tableData &&
              tableData.map((d) => {
                return (
                  <tr className="table-row">
                    {tableHeader.map((hd) => {
                      return <td>{this.parsedata(d[hd])}</td>;
                    })}
                    <span
                      className="row-delete"
                      onClick={() => this.deleteEntries(d)}
                    >
                      x
                    </span>
                  </tr>
                );
              })}
          </table>
        </div>
        {addDataPopover && (
          <PopUp
            content={this.popupcontent(tableHeader)}
            handleClose={this.handleClose}
          />
        )}
      </>
    );
  }
}
