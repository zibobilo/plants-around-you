import React from "react"
import FirstQuery from "./FirstQuery"

class GetGeoLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {
        code: null,
        message: null,
      },
      isLoaded: false,
      data: {
        decimalLatitude: null,
        decimalLongitude:null,
        coordinateUncertaintyInMeters: null,
        limit: 1
      },
      isBack: null
    };
    this.success = this.success.bind(this)
    this.error = this.error.bind(this)
  }
  error(err) {
    this.setState({ error: err})
  }

  success(pos) {
    if (pos) {
      let geo = pos.coords
      let link = `https://api.gbif.org/v1/occurrence/search?${Object.keys(geo).map((key) => `&${key}=${geo[key]}` ).join('').substring(1) }`
      fetch(link).then(res => res.json())
      .then( (result) => {
        this.setState({
          data: {
            decimalLatitude: geo.latitude.toFixed(0),
            decimalLongitude: geo.longitude.toFixed(0),
            coordinateUncertaintyInMeters: "0,2000000",
            limit: 1
          },
          isLoaded: true,
          isBack: true,
          items: result.results
        })
      })

    } else {
      this.setState({
        error: {
          code: "404",
          message : "No position detected"
        }
      })
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.success, this.error);


  }



  render() {
    const { error, isLoaded, data, isBack } = this.state;
    console.log(data)
    if (error.message !== null) {
      return <div>`ERROR(${error.code}): ${error.message}`</div>;
    } else if (!isLoaded) {
      return <div>This app is designed to be used with Geolocation: accept the geolocation or refresh the page using CTRL + F5</div>;
    } else if (isBack){
      return (

        <>hellokjdhkjdhkjdh</>
      );
    }
  }
}

export default GetGeoLocation