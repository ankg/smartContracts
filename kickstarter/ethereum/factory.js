import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface),
	'0x444D95b3F81e776569a8cA06AB6e461dCC9608d1'
);

export default instance;