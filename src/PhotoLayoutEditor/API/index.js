import Side from './Side';
import Grid from './Grid';
import Cropper from './Cropper';
import Util from './Util';


function API(store) {
	this.side = new Side(store);
	this.grid = new Grid(store);
	this.cropper = new Cropper(store);
	this.util = new Util(store);
}


export default API;