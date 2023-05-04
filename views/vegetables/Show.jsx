const React = require("react")
const Nav = require("../components/Nav")

class Show extends React.Component {
  render() {
    const vegetable = this.props.vegetable
    return (
      <div>
        <Nav link="/vegetables" text="Home" />
        <h1> Show Page </h1>
          The {vegetable.name} is {vegetable.color} <br />
          {vegetable.readyToEat? 'Its is ready to eat' : 'It is not ready to eat... Cant touch this' }
      </div>
    )
  }
}

module.exports = Show