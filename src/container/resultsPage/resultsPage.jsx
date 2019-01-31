import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import ChoiceCards from '../../components/choiceCards';
import { Link } from 'react-router-dom';

class resultsPage extends Component {

  componentDidMount(){
    // (this.props);
  }

  componentDidUpdate(){
  }


  renderCards(){
    const search = this.props.results.search;
    const random = this.props.results.random;
    // (this.props.results)
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
  // (state);
  return {
    results: state.searchResultsReducer,
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(resultsPage);
