var items = ['One', 'Two', 'Three'];

var blockStyle = {
  borderLeft: '1px solid #ccc',
  marginBottom: 20,
  paddingLeft: 10,
};

var Component = React.createClass({
  getInitialState() {
    return {
      group1: '',
      group2: '',
      group3: '',
    };
  },

  renderBlock(item) {
    return (
      <div>
        <div style={{lineHeight: '40px'}}>{item}</div>
        eh
      </div>
    );
  },

  onChange(groupName) {
    return (el) => {
      this.setState({[groupName]: el.target.value});
    };
  },

  render() {
    return (
      <div>
        <div style={blockStyle}>
          <RadioGroup
            onChange={this.onChange('group1')}
            value={this.state.group1}
            items={items}
          />
        </div>
        <div style={blockStyle}>
          <RadioGroup
            onChange={this.onChange('group2')}
            value={this.state.group2}
            items={items}
            inline
          />
        </div>
        <div style={blockStyle}>
          <RadioGroup
            onChange={this.onChange('group3')}
            value={this.state.group3}
            items={items}
            renderItem={this.renderBlock}
            width="100%"
          />
        </div>
      </div>
    );
  },
});

ReactDOM.render(<Component />, mountNode);
