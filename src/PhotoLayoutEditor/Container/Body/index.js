import React from 'react';

import GridLayout from "./GridLayout";
import Toolbar from './Toolbar';


export default class Body extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="ple-container">
				<div className="ple-body">
					<Toolbar/>
					<GridLayout/>
				</div>
			</div>
		);
	}

}