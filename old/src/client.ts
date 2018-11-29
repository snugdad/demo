import axios from 'axios'
import { AxiosInstance } from 'axios'

class HttpClient {
	private _instance: AxiosInstance;

    public constructor (
		public config: any,
		public endpoints: any={}
	) { this._instance = axios.create(config); }

	createEntity = (entity: any) => {
		this.endpoints[entity.name] = this.createBasicCRUDEndpoints(entity)
	}

	createEntities = (entities: any[]) => {
		entities.forEach(this.createEntity.bind(this));
	}

	createBasicCRUDEndpoints = ({ name }: any) => {
		let endpoints: any = {}
		const resourceURL = `/${name}`;

		endpoints.getAll = ( { query }: any={} ) => this._instance.get(resourceURL, { params: { query } });
		endpoints.getOne = ( { id }: any) => this._instance.get(`${resourceURL}/${id}`);
		endpoints.create = ( toCreate: any ) => this._instance.post(resourceURL, toCreate);
		endpoints.update = ( toUpdate: any ) => this._instance.patch(`${resourceURL}/${toUpdate.id}`, toUpdate)

		return endpoints;
	}
}

export default HttpClient;