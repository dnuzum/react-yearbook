const React = require('react');

const PersonShow = React.createClass({
  getInitialState: function() {
    return {person: null};
  },
  componentDidMount() {
    fetch(`/api/people/${this.props.params.id}`)
      .then(response => {
        response.json().then(data => {
          this.setState({person: data.user});
        });
      }).catch(error => {
        this.setState({person: null});
      });
  },
  capitalize: function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  },
  personName: function() {
    let name = this.state.person.name;
    return `${this.capitalize(name.first)} ${this.capitalize(name.last)}`
  },
  render: function() {
    if (!this.state.person) return (
      <div>
        <h1>Yearbook</h1>
        <h2>Loading...</h2>
      </div>
    );

    return (
      <div>
        <div className="well">
          <img src={this.state.person.picture.medium} />
          <h2>{this.personName()}</h2>
          <ul>
            <li><strong>Email:</strong> {this.state.person.email}</li>
            <li><strong>Phone:</strong> {this.state.person.phone}</li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = PersonShow;