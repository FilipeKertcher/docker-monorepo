import ormConfig from './ormconfig';

import { DataSource, DataSourceOptions } from 'typeorm';

const dataSource = new DataSource(ormConfig as DataSourceOptions);
export default dataSource;
