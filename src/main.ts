import './styles.scss';
import { SiteController } from './controllers/siteController';
import { SiteView } from './views/siteView';

new SiteController(new SiteView());
