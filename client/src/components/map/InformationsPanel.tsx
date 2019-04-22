import React, { FunctionComponent, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Feature } from "geojson";

interface Props {
  marker: Feature,
  travelTime: Number,
  travelDistance: Number
}

const InformationsPanel: FunctionComponent<Props> = props => {

  const [isTravelInformationOpen, setIsTravelInformationOpen] = useState(false)
  const [benchTargetName, setBenchTargetName] = useState('Nom par défaut')
  const [benchTargetDescription, setBenchTargetDescription] = useState('Description par défaut')

  useEffect(() => {
    if (props.marker && props.marker.properties) {
      setBenchTargetName(props.marker.properties.name)
      setBenchTargetDescription(props.marker.properties.description)
      setIsTravelInformationOpen(true)
    }
  }, [props.marker])

  const panelClassName = "mapboxgl-map__travel-informations-panel";
  return (
    <div className={isTravelInformationOpen ? `${panelClassName} open` : panelClassName}>
      <div className="mapboxgl-map__travel-informations-panel__informations--installation">
        <span className="mapboxgl-map__travel-informations-panel__bench-name">{benchTargetName}</span>
        <span className="mapboxgl-map__travel-informations-panel__bench-description">{benchTargetDescription}</span>
      </div>
      <div className="mapboxgl-map__travel-informations-panel__travel-duration">
        {props.travelTime && props.travelDistance && <p>Nous vous prévoyons {props.travelTime} minutes de trajet ({props.travelDistance} km)</p>}
      </div>
    </div>
  )
}

export default observer(InformationsPanel)