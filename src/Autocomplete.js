import React, { Component } from 'react';
import './Autocomplete.css';

export class Autocomplete extends Component {
  static propTypes = {};
  static defaultProperty={
    suggestions: []
  };

  constructor(props){
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: '',
      tags: ['India']
    }
  }

  onChange = (e) => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
    (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = (e) => {
    this.setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: null
    });
    const userInput = e.currentTarget.innerText;

    if (userInput){
      if (this.state.tags.find(tag => tag.toLowerCase() === userInput.toLowerCase())) {
        return;
      }
      this.setState({ tags: [...this.state.tags, userInput]});
      this.tagInput.value = null;
    }
  };

  onKeyDown = e => {
    const val = e.target.value;
    const { activeSuggestion, filteredSuggestions } = this.state;
    if (e.keyCode === 13 && val) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });

      if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      this.setState({ tags: [...this.state.tags, val]});
      this.tagInput.value = null;
    } else if (e.key === 'Backspace' && !val) {
        this.removeTag(this.state.tags.length - 1);
    }
  };

  removeTag = (i) => {
    const newTags = [ ...this.state.tags ];
    newTags.splice(i, 1);
    this.setState({ tags: newTags });
  }

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;
    if (showSuggestions && userInput.length >= 3) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              
              return (
                <li className="search__list" key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div>
            <p>No suggestions...</p>
          </div>
        );
      }
    }

    return(
      <div className="box">
        <ul className="tag_ul">
          { this.state.tags.map((tag, i) => (
              <li className="li_tag" key={tag}>
                  {tag} <button type="button" onClick={() => { this.removeTag(i); }}>x</button>
              </li>
              ))}
        </ul>
        <ul>
          <li className="input_ul">
            <input
                className="text_box"
                type="text"
                onKeyDown={onKeyDown}
                onChange={onChange}
                value={userInput}
                placeholder="Enter a country"
                onClick={onClick} ref={c => { this.tagInput = c; }}
            />
          </li>
          <li className="input_ul">
            {suggestionsListComponent}
          </li>
        </ul>
      </div>
    )
  }
}
export default Autocomplete;
