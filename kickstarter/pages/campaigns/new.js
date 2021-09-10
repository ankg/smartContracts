import React, {Component} from 'react';
import Layout from "../../components/Layout";
import {Form, Button, Input, Message} from 'semantic-ui-react';
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

class CampaignNew extends Component {
	state = {
		minimumContribution: '',
		errorMessage: ''
	};

	onSubmit = async (event) => {
		event.preventDefault();

		try {
		const accounts = await web3.eth.getAccounts();
		await factory.methods
			  .createCampaign(this.state.minimumContribution)
			  .send({
			  	from: accounts[0]
			  });
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}
	}

	render() {
		return(
			<Layout> 
				<h3>Create a Campaign</h3>
				<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
					<Form.Field>
						<label>Minimum contribution</label>
						<Input 
						value={this.state.minimumContribution}
						onChange={event => this.setState({minimumContribution:event.target.value})}
						label="wei" 
						labelPosition="right" />
					</Form.Field>
					<Message error header="Oops!" content={this.state.errorMessage} />
					<Button primary>Create</Button>
				</Form>
			</Layout>
		);	
	};
}

export default CampaignNew;