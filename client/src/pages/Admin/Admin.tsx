import React, { Component, createRef } from 'react';
import { Transition } from 'react-transition-group';
import { TweenLite } from 'gsap';
import ApiClient from '../../ApiClient/ApiClient';
import { ApiBench } from '../../@types';

type props = {
  show: boolean,
}

class Admin extends Component<props> {
  installationID: React.RefObject<HTMLInputElement>;
  installationName: React.RefObject<HTMLInputElement>;
  installationDescription: React.RefObject<HTMLTextAreaElement>;
  installationLockedDescription: React.RefObject<HTMLTextAreaElement>;
  installationLatitude: React.RefObject<HTMLInputElement>;
  installationLongitude: React.RefObject<HTMLInputElement>;

  constructor(props: props) {
    super(props)

    this.installationID = React.createRef()
    this.installationName = React.createRef()
    this.installationDescription = React.createRef()
    this.installationLockedDescription = React.createRef()
    this.installationLatitude = React.createRef()
    this.installationLongitude = React.createRef()
  }

  render() {
    const { show } = this.props

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
          name: installationName,
          description: installationDescription,
          lockedDescription: installationLockedDescription,
          latitude: parseFloat(installationLatitude),
          longitude: parseFloat(installationLongitude)
        })
      }
    }

    const updateBench = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      let fieldsToUpdate: ApiBench = {
        _id: this.installationID.current!.value
      };

      if (this.installationName.current
        && this.installationName.current.value.length > 0) {
        fieldsToUpdate.name = this.installationName.current.value
      }

      if (this.installationDescription.current
        && this.installationDescription.current.value.length > 0) {
        fieldsToUpdate.description = this.installationDescription.current.value
      }

      if (this.installationLockedDescription.current
        && this.installationLockedDescription.current.value.length > 0) {
        fieldsToUpdate.lockedDescription = this.installationLockedDescription.current.value
      }

      if (this.installationLatitude.current
        && this.installationLatitude.current.value.length > 0
        && this.installationLongitude.current
        && this.installationLongitude.current.value.length > 0) {
        fieldsToUpdate.geolocation = [parseFloat(this.installationLatitude.current.value), parseFloat(this.installationLongitude.current.value)]
      }

      ApiClient.updateBench(fieldsToUpdate)
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
          <h3>Ajouter une installation</h3>
          <form action="/" onSubmit={createBench}>
            <input type="text" placeholder="Nom" ref={this.installationName} />
            <textarea placeholder="Description" ref={this.installationDescription}></textarea>
            <textarea placeholder="Description bloquée" ref={this.installationLockedDescription}></textarea>
            <input type="text" placeholder="Latitude" ref={this.installationLatitude} />
            <input type="text" placeholder="Longitude" ref={this.installationLongitude} />
            <button type="submit">Envoyer</button>
          </form>

          <h3>Mettre à jour une installation</h3>
          <form action="/" onSubmit={updateBench}>
            <input type="text" placeholder="ID" ref={this.installationID} />
            <input type="text" placeholder="Nom" ref={this.installationName} />
            <textarea placeholder="Description" ref={this.installationDescription}></textarea>
            <textarea placeholder="Description bloquée" ref={this.installationLockedDescription}></textarea>
            <input type="text" placeholder="Latitude" ref={this.installationLatitude} />
            <input type="text" placeholder="Longitude" ref={this.installationLongitude} />
            <button type="submit">Envoyer</button>
          </form>

          <h3>Supprimer une installation</h3>
        </div>
      </Transition>

    )
  }
}

export default Admin;