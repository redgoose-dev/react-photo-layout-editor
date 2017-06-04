import Layout from './Layout';
import Side from './Side';
import Grid from './Grid';
import Cropper from './Cropper';


export default function API(store) {

	this.layout = new Layout(store);
	this.side = new Side(store);
	this.grid = new Grid(store);
	this.cropper = new Cropper(store);

}