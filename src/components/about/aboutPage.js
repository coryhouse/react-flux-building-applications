"use strict";

var React = require('react');
var withRouter = require('react-router').withRouter;

var About = React.createClass({
	componentDidMount: function() {
		this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave)
	},

	routerWillLeave: function(nextLocation) {
		// return false to prevent a transition w/o prompting the user,
		// or return a string to allow the user to decide:
		return 'Are you sure you want to leave a page that\'s this exciting?';
	},

	render: function () {
		return (
			<div>
				<h1>About</h1>
				<div>
					This application uses the following technologies:
					<ul>
						<li>React</li>
						<li>React Router</li>
						<li>Flux</li>
						<li>Node</li>
						<li>Gulp</li>
						<li>Browserify</li>
						<li>Bootstrap</li>
					</ul>
				</div>
			</div>
		); 
	}
});

module.exports = withRouter(About);