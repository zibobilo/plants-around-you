import React from "react"

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
      isBack: null,
      geometry: null
    };
    this.success = this.success.bind(this)
    this.error = this.error.bind(this)
    this.getSquare = this.getSquare.bind(this)
  }
  error(err) {
    this.setState({ error: err})
  }

  getSquare(pos, dist = 2) {
    let lat = Number(pos.coords.latitude.toFixed(0))
    let lon = Number(pos.coords.longitude.toFixed(0))
    return `POLYGON((${lon+dist}%20${lat-dist},${lon-dist}%20${lat-dist},${lon-dist}%20${lat+dist},${lon+dist}%20${lat+dist},${lon+dist}%20${lat-dist}))`
  }

  success(pos) {
    if (pos) {

      this.setState({
        data: {
          decimalLatitude: pos.coords.latitude.toFixed(0),
          decimalLongitude: pos.coords.longitude.toFixed(0),
          // coordinateUncertaintyInMeters: "0,200000000",
          limit: 20,
          geometry: this.getSquare(pos),
        },
        isLoaded: true,
      }, () => {
        let geo = this.state.data
        let link = `https://api.gbif.org/v1/occurrence/search?${Object.keys(geo).map((key) => `&${key}=${geo[key]}` ).join('')}`
        console.log(link)
        fetch(link).then(res => res.json())
        .then( (result) => {
          this.setState({
            isBack: true,
            data: result.results
          })
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
      return <div>ERROR({error.code}): {error.message}`</div>;
    } else if (!isLoaded) {
      return <div>This app is designed to be used with Geolocation: accept the geolocation or refresh the page using CTRL + F5</div>;
    }  else if (isLoaded && !isBack) {
      return (
        <>Loading...</>
      )
    } else if (isBack){
      return (
        <ul>
        {data.map(item =>
        item.media[0]? <>
        <li key={item.key}>
        <h1>{item.scientificName}</h1>
        </li>
        <img src={item.media[0]?.identifier} height="300"/>
        </>
      : <></>
        )}
      </ul>
      );
    }
  }
}

export default GetGeoLocation