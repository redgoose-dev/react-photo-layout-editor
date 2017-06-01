import Layout from './Layout';
import Side from './Side';
import Grid from './Grid';


export default function API(store) {

	this.layout = new Layout(store);
	this.side = new Side(store);
	this.grid = new Grid(store);

}