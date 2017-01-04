"use strict";

var React = require('react');

var Select = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
    defaultOption: React.PropTypes.string,
    value: React.PropTypes.string,
    error: React.PropTypes.string,
    options: React.PropTypes.arrayOf(React.PropTypes.object)
  },

  render: function () {
    var renderOption = function(option) {
      return (
        <option key={option.value} value={option.value}>{option.text}</option>
      );
    };

    return (
      <div className="form-group">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className="field">
            {/* Note, value is set here rather than on the option - docs: https://facebook.github.io/react/docs/forms.html */}      
            <select 
              name={this.props.name}
              value={this.props.value}
              onChange={this.props.onChange}
              className="form-control">
            <option value="">{this.props.defaultOption}</option>
            {this.props.options.map(renderOption)}
          </select>
          <div className="input">{this.props.error}</div>
        </div>
      </div>
    );
  }
});

module.exports = Select;
