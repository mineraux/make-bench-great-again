import React, {Component, createRef} from 'react';
import {Transition } from 'react-transition-group';
import {TweenLite} from 'gsap';
import ApiClient from '../../ApiClient/ApiClient';

type props = {
  show: boolean,
}

class Admin extends Component<props> {
  installationName: React.RefObject<HTMLInputElement>;
  installationDescription: React.RefObject<HTMLTextAreaElement>;
  installationLockedDescription: React.RefObject<HTMLTextAreaElement>;
  installationLatitude: React.RefObject<HTMLInputElement>;
  installationLongitude: React.RefObject<HTMLInputElement>;

  constructor(props: props) {
    super(props)

    this.installationName = React.createRef()
    this.installationDescription = React.createRef()
    this.installationLockedDescription = React.createRef()
    this.installationLatitude = React.createRef()
    this.installationLongitude = React.createRef()
  }

  render() {
    const {show} = this.props

    const createBench = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (this.installationName.current
        && this.installationDescription.current 
        && this.installationLockedDescription.current 
        && this.installationLatitude.current 
        && this.installationLongitude.current) {

        const installationName = this.installationName.current.value
        const installationDescription = this.installationDescription.current.value
        const installationLockedDescription = this.installationLockedDescription.current.value
        const installationLatitude = this.installationLatitude.current.value
        const installationLongitude = this.installationLongitude.current.value

        ApiClient.createBench({
          name:installationName, 
          description:installationDescription, 
          lockedDescription:installationLockedDescription, 
          latitude: parseFloat(installationLatitude), 
          longitude: parseFloat(installationLongitude)
        })
      }
    }

    return (
      <Transition
        unmountOnExit
        
        in={show}
        timeout={8000}
        onEnter={node => TweenLite.set(node, {
          autoAlpha: 0,
          x: -50
        })}
        addEndListener={(node, done) => {
          TweenLite.to(node, 0.5, {
            autoAlpha: show ? 1 : 0,
            x: show ? 0 : 50,
            onComplete: done
          });
        }}
      >
        <div className="admin-panel">
          <h2>Admin interface</h2>
          <form action="/" onSubmit={createBench}>
          <input type="text" placeholder="Nom" ref={this.installationName}/>
          <textarea placeholder="Description" ref={this.installationDescription}></textarea>
          <textarea placeholder="Description bloquée" ref={this.installationLockedDescription}></textarea>
          <input type="text" placeholder="Latitude" ref={this.installationLatitude}/>
          <input type="text" placeholder="Longitude" ref={this.installationLongitude}/>
          <button type="submit">Envoyer</button>
          </form>
        </div>
      </Transition>

    )
  }
}

export default Admin;