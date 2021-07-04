import React from "react"

class FirstQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBack: false,
      items: [],
    };
  }

  componentDidMount () {
    let geo = this.props.geolocation
    let link = `https://api.gbif.org/v1/occurrence/search?${Object.keys(geo).map((key) => `&${key}=${geo[key]}` ).join('').substring(1) }`
    fetch(link).then(res => res.json())
    .then( (result) => {
      this.setState({ isBack: true })
        this.setState({ isBack: true, items: result.results });
      }
    )
  }

  render() {
    const { isBack, items } = this.props;

    if (!isBack) {
      return <div>Loading...........................</div>
    } else {
      return <>
        <ul>
          {items.map(item =>
            <li key={item.key}>
              {item.genericName}
            </li>
          )}
        </ul>
      </>
    }
  }
}

export default FirstQuery