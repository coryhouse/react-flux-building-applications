/*eslint-disable strict */ //Disabling check because we can't run strict mode. Need global vars.

var React = require('react');
var Header = require('./common/header');
$ = jQuery = require('jquery');
var createReactClass = require('create-react-class');
var ReactRouter = require('react-router-dom');
var HomePage = require('./homePage');
var AuthorPage = require('./authors/authorPage');
var ManageAuthorPage = require('./authors/manageAuthorPage');
var AboutPage = require('./about/aboutPage');
var NotFoundPage = require('./notFoundPage');

var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Redirect = ReactRouter.Redirect;

var App = createReactClass({
	render: function() {
		return (
			<div>
				<Header/>
				<div className="container-fluid">
					<Switch>
						{ /* Redirect typos */ }
						<Redirect from="/awthurs" to="/authors"/>
						<Redirect from="/about-us" to="/about"/>

						<Route exact path="/" component={HomePage}/>
						<Route path="/authors" component={AuthorPage}/>
						<Route path="/author" component={ManageAuthorPage} exact />
						<Route path="/author/:id" component={ManageAuthorPage}/>
						<Route path="/about" component={AboutPage}/>
						<Route component={NotFoundPage}/>
					</Switch>
				</div>
			</div>
		);
	}
});

module.exports = App;