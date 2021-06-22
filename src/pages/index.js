import * as React from "react";

require('../includes/bootstrap.js');

export default class IndexPage extends React.Component {
	constructor(props) {
		super(props)

		this.handleHtaccessInput = this.handleHtaccessInput.bind(this);
	}

	state = {
		htaccess: ''
	}

	getDomainFromUrl(url) {
		let match = url.match(/^https?:\/\/([^\/]+)/i);

		if (match) {
			return match[1];
		}

		return false;
	}

	getPathFromUrl(url) {
		let match = url.match(/^https?:\/\/[^\/]+(\/?.*)/i);

		if (match) {
			return match[1];
		}

		return false;
	}

	handleHtaccessInput(event) {
		const input = event.target.value;

		const urls = input.split("\n");

		let htaccess = 'RewriteEngine On';

		for (let i=0;i<urls.length;++i) {
			let url = urls[i].split( "\t" );

			if (url.length !== 2) {
				continue;
			}

			let urlFrom = url[0];
			let urlTo = url[1];

			let domainFrom = this.getDomainFromUrl(urlFrom);
			let domainTo = this.getDomainFromUrl(urlTo);

			if (!domainFrom || !domainTo) {
				continue;
			}

			let pathFrom = this.getPathFromUrl(urlFrom);

			let htaccessRule = "\n\n";

			htaccessRule += 'RewriteCond %{HTTP_HOST} ' + domainFrom + "\n";
			htaccessRule += 'RewriteRule ^' + pathFrom + '$ ' + urlTo;

			htaccess += htaccessRule;
		}

		console.log(htaccess);

		this.setState({
			htaccess: htaccess
		});
	}

	render() {
		return (
			<main>
				<section className="ui vertical segment container">
					<h1 className="ui header">Welcome to Cozy Coding</h1>
					<p>Here you'll find a set of tools that will hopefully help you out.</p>
				</section>
				<section className="ui vertical segment container">
					<h2 className="ui header">Apache .htaccess redirect generator</h2>
					<form className="ui form">
						<div className="ui field">
							<label htmlFor="htaccess-urls">
								URLs to generate htaccess with
							</label>
							<textarea id="htaccess-urls" onInput={this.handleHtaccessInput} placeholder="Paste the URLs here"></textarea>
						</div>
						<div className="ui field">
							<label htmlFor="htaccess-generated">
								Generated htaccess
							</label>
							<textarea
								readOnly
								id="htaccess-generated"
								placeholder="htaccess will be generated here"
								value={this.state.htaccess}></textarea>
						</div>
					</form>
				</section>
			</main>
		)
	}
};	
