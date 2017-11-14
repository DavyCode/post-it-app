import React, { Component } from 'react';
import ViewActions from '../actions/AppActions';
import GroupStore from '../stores/GroupStore';
// import GroupList from './GroupList';
import Layout from './Layout';


const { createGroup } = ViewActions;

/**
 * 
 * 
 * @class Groups
 * @extends {Component}
 */
class Groups extends Component {
  /**
   * @constructor
   * Creates an instance of Groups.
   * @param {any} props 
   * @memberof Groups
   */
  constructor(props) {
    super(props);
    this.state = {
      groupList: GroupStore.getGroups(),
      isFetchingData: false,
      fetchMessage: '',
    };
    this._onChange = this._onChange.bind(this);
    this.fetchGroups = this.fetchGroups.bind(this);
  }
  /**
   * @description Adds a change listener to the
   * Groupstore just before the component is mounted
   * 
   * @memberof Groups
   */
  componentWillMount() {
    GroupStore.addChangeListener(this._onChange);
  }
  /**
   * @description Removes change listener just before 
   * the component unmounts
   * 
   * @memberof Groups
   */
  componentWillUnmount() {
    GroupStore.removeChangeListener(this._onChange);
  }
  /**
   *  @description This method is passed to the change listeners
   * to update the state of the component when there is a 
   * change in the store
   * 
   * @memberof Groups
   */
  _onChange() {
    this.setState({
      groupList: GroupStore.getGroups(),
    });
  }
  /**
   * @description This method calls the createGroup Action
   * 
   * @param {any} event 
   * @memberof Groups
   */
  doCreateGroup(event) {
    event.preventDefault();
    const newGroupName = this.refs.groupName.value.trim();
    const userUid = localStorage.getItem('userUid');
    const userName = localStorage.getItem('userName');
    if (newGroupName !== '') {
      createGroup(newGroupName, userUid, userName);
      this.refs.groupName.value = '';
    }
  } 
  /**
   * @description This method calls the getGoups action
   * 
   * @memberof Groups
   */
  fetchGroups() {
    const userUid = localStorage.getItem('userUid');
    getGroups(userUid);
  }
  /**
   * 
   * 
   * @returns jsx component of the GroupBoard
   * @memberof Groups
   */
  render() {
    const { groupList } = this.state;
    return (
      <div>
        <Layout/>
        <div className="exTab1 container">
          <ul className="nav nav-pills">
            <li className="active">
              <a href="" data-target=".1a" data-toggle="tab">Create A Group</a>
            </li>
          </ul>

          <div className="tab-content clearfix">
            <div className="tab-pane active 1a" id="1a" aria-hidden="true">
              <div className="row">
                <p className ="col-md-6"><strong>Welcome to your GroupBoard,
                </strong><br/>
                  Post-It allows you to create groups and add other users 
                  to that group.
                  To create a group, kindly enter the name of your group 
                  and click the Create Group button
                </p>
              </div>
              <form onSubmit={this.doCreateGroup.bind(this)}>
                <div className="form-group row">
                  <div className ="col-sm-6">
                    <input type="text" ref="groupName" 
                      className="form-control grpInput" 
                      id="groupName" required={true} />
                  </div>
                  <div className="col-sm-4">
                    <button type="submit" className="send" 
                      className="btn btn-primary grpButton" >
                      Create Group</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Groups;