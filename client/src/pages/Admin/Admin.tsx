import React, { Component, createRef } from 'react';
import Transition from './Transition';
import ApiClient from '../../ApiClient/ApiClient';
import { ApiBench } from '../../@types';
import './admin.scss'

type props = {
  show: boolean,
}

type stateAdmin = {
  requestMessage: string
}

class Admin extends Component<props, stateAdmin> {
  createBenchForm: HTMLFormElement | null = null;
  updateBenchForm: HTMLFormElement | null = null;
  deleteBenchForm: HTMLFormElement | null = null;

  constructor(props: props) {
    super(props)

    this.state = {
      requestMessage: ""
    }
  }

  render() {
    const { show } = this.props

    const createBench = async (e: React.FormEvent<HTMLFormElement>) => {

      e.preventDefault()

      if (this.createBenchForm) {

        const name: string = (this.createBenchForm.querySelector('[name="name"]') as HTMLInputElement).value
        const description: string = (this.createBenchForm.querySelector('[name="description"]') as HTMLTextAreaElement).value
        const lockedDescription: string = (this.createBenchForm.querySelector('[name="lockedDescription"]') as HTMLTextAreaElement).value
        const latitude: string = (this.createBenchForm.querySelector('[name="latitude"]') as HTMLInputElement).value
        const longitude: string = (this.createBenchForm.querySelector('[name="longitude"]') as HTMLInputElement).value

        if (name.length > 0
          && description.length > 0
          && lockedDescription.length > 0
          && latitude.length > 0
          && longitude.length > 0) {

          await (ApiClient.createBench({
            name: name,
            description: description,
            lockedDescription: lockedDescription,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
          })
          )
            .then(res => {
              this.setState({ requestMessage: `Le banc "${res.name}"(ID:${res._id}) a été créer avec succès` })
            })
            .catch(err => {
              this.setState({ requestMessage: `${err}` })
            })
        } else {
          console.log("Tout les champs sont nécessaires pour ajouter une nouvelle installation")
        }
      }
    }

    const updateBench = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (this.updateBenchForm) {

        const id: string = (this.updateBenchForm.querySelector('[name="id"]') as HTMLInputElement).value
        const name: string = (this.updateBenchForm.querySelector('[name="name"]') as HTMLInputElement).value
        const description: string = (this.updateBenchForm.querySelector('[name="description"]') as HTMLTextAreaElement).value
        const lockedDescription: string = (this.updateBenchForm.querySelector('[name="lockedDescription"]') as HTMLTextAreaElement).value
        const latitude: string = (this.updateBenchForm.querySelector('[name="latitude"]') as HTMLInputElement).value
        const longitude: string = (this.updateBenchForm.querySelector('[name="longitude"]') as HTMLInputElement).value

        let fieldsToUpdate: ApiBench = {
          _id: id
        }

        if (name.length > 0) {
          fieldsToUpdate.name = name
        }

        if (description.length > 0) {
          fieldsToUpdate.description = description
        }

        if (lockedDescription.length > 0) {
          fieldsToUpdate.lockedDescription = lockedDescription
        }

        if (latitude.length > 0 && longitude.length > 0) {
          fieldsToUpdate.geolocation = [parseFloat(latitude), parseFloat(longitude)]
        }

        await (ApiClient.updateBench(fieldsToUpdate))
          .then(res => {
            this.setState({ requestMessage: `Le banc "${res.name}"(ID:${res._id}) a été mis à jour avec succès` })
          })
          .catch(err => {
            this.setState({ requestMessage: `${err}` })
          })
      }
    }

    const deleteBench = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (this.deleteBenchForm) {
        const id: string = (this.deleteBenchForm.querySelector('[name="id"]') as HTMLInputElement).value

        await (ApiClient.deleteBench(id))
          .then(res => {
            this.setState({ requestMessage: `Le banc "${res.name}"(ID:${res._id}) a été supprimé avec succès` })
          })
          .catch(err => {
            this.setState({ requestMessage: `${err}` })
          })
      }
    }

    return (
      <Transition show={show}>
        <div className="admin-panel">
          <h2>Admin interface</h2>
          <h3>Ajouter une installation</h3>
          {
            this.state.requestMessage.length > 0
            && <p>{this.state.requestMessage}</p>
          }
          <form
            action="/"
            onSubmit={createBench}
            ref={el => this.createBenchForm = el}
            className="admin-panel__form"
          >
            <input type="text" name="name" placeholder="Nom" required className="admin-panel__form__field"/>
            <textarea name="description" placeholder="Description" required className="admin-panel__form__field"></textarea>
            <textarea name="lockedDescription" placeholder="Description bloquée" required className="admin-panel__form__field"></textarea>
            <input type="text" name="latitude" placeholder="Latitude" required className="admin-panel__form__field"/>
            <input type="text" name="longitude" placeholder="Longitude" required className="admin-panel__form__field"/>
            <button type="submit" className="admin-panel__form__submit-button">Envoyer</button>
          </form>

          <h3>Mettre à jour une installation</h3>
          <form
            action="/"
            onSubmit={updateBench}
            ref={el => this.updateBenchForm = el}
            className="admin-panel__form"
          >
            <input type="text" name="id" placeholder="ID" required className="admin-panel__form__field"/>
            <input type="text" name="name" placeholder="Nom" className="admin-panel__form__field"/>
            <textarea name="description" placeholder="Description" className="admin-panel__form__field"></textarea>
            <textarea name="lockedDescription" placeholder="Description bloquée" className="admin-panel__form__field"></textarea>
            <input type="text" name="latitude" placeholder="Latitude" className="admin-panel__form__field"/>
            <input type="text" name="longitude" placeholder="Longitude" className="admin-panel__form__field"/>
            <button type="submit" className="admin-panel__form__submit-button">Envoyer</button>
          </form>

          <h3>Supprimer une installation</h3>
          <form
            action="/"
            onSubmit={deleteBench}
            ref={el => this.deleteBenchForm = el}
            className="admin-panel__form"
          >
            <input type="text" name="id" placeholder="ID" required className="admin-panel__form__field"/>
            <button type="submit" className="admin-panel__form__submit-button">Envoyer</button>
          </form>
        </div>
      </Transition>

    )
  }
}

export default Admin;