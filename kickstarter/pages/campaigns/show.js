import React, {Component} from 'react';
import Layout from "../../components/Layout";
import {Link} from "../../routes";
import Campaign from '../../ethereum/campaign';
import {Card} from 'semantic-ui-react';
import web3 from '../../ethereum/web3';

class CampaignShow extends Component {

	static async getInitialProps(props) {
		const campaign = Campaign(props.query.address);
		const summary = await campaign.methods.getSummary().call();

		return {
			minimumContribution: summary[0],
			balance: summary[1],
			requestsCount: summary[2],
			approversCount: summary[3],
			manager: summary[4]
		};
	}

	renderCards() {
		const {
			balance,
			manager,
			minimumContribution,
			requestsCount,
			approversCount
		} = this.props;

		const items = [
			{
				header:manager,
				meta:'Address of manager',
				description:'Manager is the creator of this campaign and can create withdraw requests',
				style: { overflowWrap: 'break-word'}
			},
			{
				header:minimumContribution,
				meta:'Minimum Contribution(wei)',
				description:'Min amount to be contributed to become an approver',
				style: { overflowWrap: 'break-word'}
			},
			{
				header:web3.utils.fromWei(balance,'ether'),
				meta:'Total contract balance (eth)',
				description:'The money that has been contributed to the campaign so far',
				style: { overflowWrap: 'break-word'}
			},
			{
				header:requestsCount,
				meta:'No. of Pending requests',
				description:'Open requests for withdrawals by the manager so far',
				style: { overflowWrap: 'break-word'}
			},
			{
				header:approversCount,
				meta:'No. of Approvers',
				description:'No of people who have already contributed',
				style: { overflowWrap: 'break-word'}
			}						
		];

		return <Card.Group items={items}/>
	}

	render() {
		return(<div>
				<h3>Campaign Show</h3>
				{this.renderCards()}
			   </div>
		); 
	}
}

export default CampaignShow;