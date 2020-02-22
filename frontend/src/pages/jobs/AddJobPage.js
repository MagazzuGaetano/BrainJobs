import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'

import Input from '../../components/Form/Input/Input'
import Select from '../../components/Form/Select/Select'
import TextArea from '../../components/Form/TextArea/TextArea'
import Button from '../../components/Form/Button/Button'
import Notification from '../../components/Notification/Notification'

import Context from '../../context/Context'


class AddJobPage extends React.Component {

  static contextType = Context

  constructor(props) {
    super(props)
    this.state = {
      languages: ['python', 'java', 'scala', 'r', 'c++', 'julia'],
      frameworks: [
        'none',
        'pytorch',
        'tensorflow',
        'caffe',
        'keras',
        'deeplearning4j',
        'apache_mahout',
        'apache_singa'
      ],
      dataset_datatypes: ['csv', 'avro', 'json'],
      fields: {
        title: '',
        language: 'python',
        framework: 'none',
        dataset: '',
        dataset_datatype: 'csv',
        model: ''
      },
      error: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  checkIfValid(value) {
    return (
      value !== undefined &&
      value !== null &&
      value !== ""
    )
  }

  handleSubmit(e) {
    e.preventDefault()

    const { fields } = this.state
    const { title,
            language,
            dataset,
            dataset_datatype,
            model } = fields

    if (this.checkIfValid(title) &&
        this.checkIfValid(language) &&
        this.checkIfValid(dataset) &&
        this.checkIfValid(dataset_datatype) &&
        this.checkIfValid(model)) {

    if (fields.framework === "none")
        delete fields.framework

    const options = {
      method: 'post',
      body: JSON.stringify(fields),
      headers: {
        'Authorization': 'Bearer ' + this.context.token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    const url = this.context.API_URL + '/jobs'
    fetch(url, options)
      .then(data => data.json())
      .then(data => {
        if(!data.message)
          this.props.history.push("/")
        else
          this.setState({error: data.message})
      })
      .catch(err => console.log(err))
    }
  }

  handleChange(e) {
    const { fields } = this.state
    this.setState({
      fields: {...fields, [e.target.name] : e.target.value}
    })
  }

  render() {
    if (!this.context.token) return <Redirect from="/jobs/add" to="/login" />

    const {
      title,
      language,
      framework,
      dataset,
      dataset_datatype,
      model
    } = this.state.fields

    const { languages, frameworks, dataset_datatypes, error } = this.state

    return (
      <div className="container">
        <div className="box">
          {error && <Notification message={error} />}
          <h2 className="title is-3">Training Request</h2>
          <form onSubmit={this.handleSubmit}>
            <Input 
              type={'text'}
              title={'Title'} 
              name={'title'}
              value={title}
              placeholder={'Enter the title'}
              handleChange={this.handleChange}
              required={true}
            />
            <Select 
              title={'Language'}
              name={'language'}
              options={languages} 
              value={language}
              placeholder={'Select a Language'}
              handleChange={this.handleChange}
            />
            <Select 
              title={'Framework'}
              name={'framework'}
              options={frameworks} 
              value={framework}
              placeholder={'Select a Framework'}
              handleChange={this.handleChange}
            />
            <TextArea 
              title={'Dataset'}
              name={'dataset'}
              value={dataset}
              placeholder={'Enter the dataset here!'}
              handleChange={this.handleChange}
              required={true}
            />
            <Select 
              title={'Dataset Datatype'}
              name={'dataset_datatype'}
              options={dataset_datatypes} 
              value={dataset_datatype}
              placeholder={'Select a DataSet DataType'}
              handleChange={this.handleChange}
            />
            <TextArea 
              title={'Model'}
              name={'model'}
              value={model}
              placeholder={'Enter the model here!'}
              handleChange={this.handleChange}
              required={true}
            />
            <br/>
            <div className="field is-grouped">
              <Button 
                className={'button is-primary is-outlined'} 
                title={'Submit'} 
              />
              <NavLink 
                className="button is-danger is-outlined" 
                to="/jobs"
              >
                Cancel
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default AddJobPage