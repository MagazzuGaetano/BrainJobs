import React from 'react'

class Notification extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			show: true
		}

		this.hide = this.hide.bind(this)
	}

	hide() {
		this.setState({ show: false })
	}

	render() {
		if (this.state.show) {
			return (
				<div className="container">
					<div className="notification is-danger">
						<button className="delete" onClick={this.hide}></button>
						{this.props.message || 'error'}
					</div>
				</div>
			)
		} else {
			return <div/>
		}
	}
}

export default Notification