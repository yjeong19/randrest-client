import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import ChoiceCards from '../../components/choiceCards';
import { Link } from 'react-router-dom';

//importing selectionlandingpage for now, route to based on click later;
import SelectionLandingPage from '../selectionLandingPage';

//temporarily importing searchbar
//is it better to make searchbar its own page


class resultsPage extends Component {
  constructor(props){
    super(props);

    //bind events
  }

  componentDidMount(){
    console.log(this.props);
  }

  componentDidUpdate(){
  }


  renderCards(){
    const search = this.props.results.search;
    const random = this.props.results.random;
    // console.log(this.props.results)
    if(this.props.results.state === 'search' && search !== null){
      return (
        search.map((info, i)=> {
          return(
            <ChoiceCards
              internal_info={this.props.results.search[i]}
              data = {info}
              addUserSelection = {this.props.addUserSelection}
            />
          )
        })
      )
    }else if(this.props.results.state === 'random' && random !==null){
      return (
        <ChoiceCards
          data = {random}
          // internal_info={this.props.results.search}
          addUserSelection = {this.props.addUserSelection}
        />
      )
    }else{
      return;
    }
  }


  render(){
    return(
      <div>
        <Link to = {'/restaurant_landing'}>
          <div>{this.renderCards()}</div>
        </Link>
      </div>
    )
  }
}


//redux setup below
const mapDispatchToProps = (dispatch) => ({
  addUserSelection: (selection) => dispatch(actions.addUserSelection(selection)),
});

const mapStateToProps = ((state, ownProps) => {
  // console.log(state);
  return {
    results: state.searchResultsReducer,
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(resultsPage);
