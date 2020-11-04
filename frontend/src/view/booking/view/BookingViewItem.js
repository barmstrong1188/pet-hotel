import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import selectors from 'modules/booking/bookingSelectors';
import bookingModel from 'modules/booking/bookingModel';

class BookingViewItem extends Component {
  valueAsArray = () => {
    const { value } = this.props;

    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  };

  displayableRecord = (record) => {
    if (this.props.hasPermissionToRead) {
      return (
        <div key={record.id}>
          <Link className="btn btn-link" to={`/booking/${record.id}`}>
          {this.label(record)}
          </Link>
        </div>
      );
    }

    return (
      <div key={record.id}>
        {this.label(record)}
      </div>
    );
  };

  label = (record) => {
    const arrival = bookingModel.fields.arrival.forView(
      record.arrival,
    );
    const departure = bookingModel.fields.departure.forView(
      record.departure,
    );
    const status = bookingModel.fields.status.forView(
      record.status,
    );

    return `${arrival} - ${departure} (${status})`
  };

  render() {
    if (!this.valueAsArray().length) {
      return null;
    }

    return (
      <div className="form-group">
        <label className="col-form-label">
          {this.props.label}
        </label>
        <br />
        {this.valueAsArray().map((value) =>
          this.displayableRecord(value),
        )}
      </div>
    );
  }
}

BookingViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
};

const select = (state) => ({
  hasPermissionToRead: selectors.selectPermissionToRead(
    state,
  ),
});

export default connect(select)(BookingViewItem);
