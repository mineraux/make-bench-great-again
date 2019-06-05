import React, { Component, createRef } from 'react'
import Transition from './Transition'
import ApiClient from '../../ApiClient/ApiClient'
import { ApiInstallation } from '../../@types'
import { pageProps } from '../types'
import './admin.scss'

type Props = pageProps

type stateAdmin = {
  requestMessage: string
}

class Admin extends Component<Props, stateAdmin> {
  createInstallationForm: HTMLFormElement | null = null
  updateInstallationForm: HTMLFormElement | null = null
  deleteInstallationForm: HTMLFormElement | null = null
  createPetitionForm: HTMLFormElement | null = null
  deletePetitionForm: HTMLFormElement | null = null

  constructor(props: Props) {
    super(props)

    this.state = {
      requestMessage: '',
    }
  }

  render() {
    const createInstallation = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (this.createInstallationForm) {
        const slug: string = (this.createInstallationForm.querySelector(
          '[name="slug"]'
        ) as HTMLInputElement).value
        const name: string = (this.createInstallationForm.querySelector(
          '[name="name"]'
        ) as HTMLInputElement).value
        const lockedName: string = (this.createInstallationForm.querySelector(
          '[name="lockedName"]'
        ) as HTMLInputElement).value
        const caption: string = (this.createInstallationForm.querySelector(
          '[name="caption"]'
        ) as HTMLInputElement).value
        const description: string = (this.createInstallationForm.querySelector(
          '[name="description"]'
        ) as HTMLTextAreaElement).value
        const lockedDescription: string = (this.createInstallationForm.querySelector(
          '[name="lockedDescription"]'
        ) as HTMLTextAreaElement).value
        const latitude: string = (this.createInstallationForm.querySelector(
          '[name="latitude"]'
        ) as HTMLInputElement).value
        const longitude: string = (this.createInstallationForm.querySelector(
          '[name="longitude"]'
        ) as HTMLInputElement).value
        const testimony: string = (this.createInstallationForm.querySelector(
          '[name="testimony"]'
        ) as HTMLInputElement).value
        const hashtags: string[] = (this.createInstallationForm.querySelector(
          '[name="hashtags"]'
        ) as HTMLInputElement).value.split(' ')

        if (
          slug.length > 0 &&
          name.length > 0 &&
          lockedName.length > 0 &&
          caption.length > 0 &&
          description.length > 0 &&
          lockedDescription.length > 0 &&
          latitude.length > 0 &&
          longitude.length > 0
        ) {
          await ApiClient.createInstallation({
            slug,
            name,
            lockedName,
            caption,
            description,
            lockedDescription,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            testimony,
            hashtags,
          })
            .then(res => {
              this.setState({
                requestMessage: `Le banc "${res.name}"(ID:${
                  res._id
                }) a été créer avec succès`,
              })
            })
            .catch(err => {
              this.setState({ requestMessage: `${err}` })
            })
        } else {
          console.log(
            'Tout les champs sont nécessaires pour ajouter une nouvelle installation'
          )
        }
      }
    }

    const updateInstallation = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (this.updateInstallationForm) {
        const id: string = (this.updateInstallationForm.querySelector(
          '[name="id"]'
        ) as HTMLInputElement).value
        const slug: string = (this.updateInstallationForm.querySelector(
          '[name="slug"]'
        ) as HTMLInputElement).value
        const name: string = (this.updateInstallationForm.querySelector(
          '[name="name"]'
        ) as HTMLInputElement).value
        const lockedName: string = (this.updateInstallationForm.querySelector(
          '[name="lockedName"]'
        ) as HTMLInputElement).value
        const caption: string = (this.updateInstallationForm.querySelector(
          '[name="caption"]'
        ) as HTMLInputElement).value
        const description: string = (this.updateInstallationForm.querySelector(
          '[name="description"]'
        ) as HTMLTextAreaElement).value
        const lockedDescription: string = (this.updateInstallationForm.querySelector(
          '[name="lockedDescription"]'
        ) as HTMLTextAreaElement).value
        const latitude: string = (this.updateInstallationForm.querySelector(
          '[name="latitude"]'
        ) as HTMLInputElement).value
        const longitude: string = (this.updateInstallationForm.querySelector(
          '[name="longitude"]'
        ) as HTMLInputElement).value
        const testimony: string = (this.updateInstallationForm.querySelector(
          '[name="testimony"]'
        ) as HTMLInputElement).value
        const hashtags: string[] = (this.updateInstallationForm.querySelector(
          '[name="hashtags"]'
        ) as HTMLInputElement).value.split('-')

        const fieldsToUpdate: ApiInstallation = {
          _id: id,
        }

        if (slug.length > 0) {
          fieldsToUpdate.slug = slug
        }

        if (name.length > 0) {
          fieldsToUpdate.name = name
        }

        if (lockedName.length > 0) {
          fieldsToUpdate.lockedName = lockedName
        }

        if (caption.length > 0) {
          fieldsToUpdate.caption = caption
        }

        if (description.length > 0) {
          fieldsToUpdate.description = description
        }

        if (lockedDescription.length > 0) {
          fieldsToUpdate.lockedDescription = lockedDescription
        }

        if (latitude.length > 0 && longitude.length > 0) {
          fieldsToUpdate.geolocation = [
            parseFloat(latitude),
            parseFloat(longitude),
          ]
        }

        // if (testimony.length > 0) {
        //   fieldsToUpdate.testimony = testimony
        // }

        if (hashtags && hashtags[0].length > 0) {
          fieldsToUpdate.hashTags = hashtags
        }

        await ApiClient.updateInstallation(fieldsToUpdate)
          .then(res => {
            this.setState({
              requestMessage: `Le banc "${res.name}"(ID:${
                res._id
              }) a été mis à jour avec succès`,
            })
          })
          .catch(err => {
            this.setState({ requestMessage: `${err}` })
          })
      }
    }

    const deleteInstallation = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (this.deleteInstallationForm) {
        const id: string = (this.deleteInstallationForm.querySelector(
          '[name="id"]'
        ) as HTMLInputElement).value

        await ApiClient.deleteInstallation(id)
          .then(res => {
            this.setState({
              requestMessage: `Le banc "${res.name}"(ID:${
                res._id
              }) a été supprimé avec succès`,
            })
          })
          .catch(err => {
            this.setState({ requestMessage: `${err}` })
          })
      }
    }

    const createPetition = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (this.createPetitionForm) {
        const subscribers: string[] = (this.createPetitionForm.querySelector(
          '[name="subscribers"]'
        ) as HTMLInputElement).value.split(' ')

        const relatedInstallation: string = (this.createPetitionForm.querySelector(
          '[name="relatedInstallation"]'
        ) as HTMLInputElement).value

        await ApiClient.createPetition({ subscribers, relatedInstallation })
          .then(res => {
            this.setState({
              requestMessage: `La pétition "${res._id}"(ID:${
                res._id
              }) a été créée avec succès`,
            })
          })
          .catch(err => {
            this.setState({ requestMessage: `${err}` })
          })
      }
    }

    const deletePetition = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (this.deletePetitionForm) {
        const id: string = (this.deletePetitionForm.querySelector(
          '[name="id"]'
        ) as HTMLInputElement).value

        await ApiClient.deletePetition(id)
          .then(res => {
            this.setState({
              requestMessage: `La pétition "${
                res._id
              }" a été supprimé avec succès`,
            })
          })
          .catch(err => {
            this.setState({ requestMessage: `${err}` })
          })
      }
    }

    return (
      <div className="admin-panel">
        <h2>Admin interface</h2>
        <h3>Ajouter une installation</h3>
        {this.state.requestMessage.length > 0 && (
          <p>{this.state.requestMessage}</p>
        )}
        <form
          action="/"
          onSubmit={createInstallation}
          ref={el => (this.createInstallationForm = el)}
          className="admin-panel__form"
        >
          <input
            type="text"
            name="slug"
            placeholder="Slug"
            required
            className="admin-panel__form__field"
          />
          <input
            type="text"
            name="name"
            placeholder="Nom"
            required
            className="admin-panel__form__field"
          />
          <input
            type="text"
            name="lockedName"
            placeholder="Nom caché"
            required
            className="admin-panel__form__field"
          />
          <input
            type="text"
            name="caption"
            placeholder="Légende"
            required
            className="admin-panel__form__field"
          />
          <textarea
            name="description"
            placeholder="Description"
            required
            className="admin-panel__form__field"
          />
          <textarea
            name="lockedDescription"
            placeholder="Description bloquée"
            required
            className="admin-panel__form__field"
          />
          <input
            type="text"
            name="latitude"
            placeholder="Latitude"
            required
            className="admin-panel__form__field"
          />
          <input
            type="text"
            name="longitude"
            placeholder="Longitude"
            required
            className="admin-panel__form__field"
          />
          <input
            type="text"
            name="testimony"
            placeholder="Témoignage"
            required
            className="admin-panel__form__field"
          />
          <input
            type="text"
            name="hashtags"
            placeholder="Hastags"
            required
            className="admin-panel__form__field"
          />
          <button type="submit" className="admin-panel__form__submit-button">
            Envoyer
          </button>
        </form>

        <h3>Mettre à jour une installation</h3>
        <form
          action="/"
          onSubmit={updateInstallation}
          ref={el => (this.updateInstallationForm = el)}
          className="admin-panel__form"
        >
          <input
            type="text"
            name="id"
            placeholder="ID"
            required
            className="admin-panel__form__field"
          />
          <input
            type="text"
            name="slug"
            placeholder="Slug"
            className="admin-panel__form__field"
          />
          <input
            type="text"
            name="name"
            placeholder="Nom"
            className="admin-panel__form__field"
          />
          <input
            type="text"
            name="lockedName"
            placeholder="Nom caché"
            className="admin-panel__form__field"
          />
          <input
            type="text"
            name="caption"
            placeholder="Légende"
            className="admin-panel__form__field"
          />
          <textarea
            name="description"
            placeholder="Description"
            className="admin-panel__form__field"
          />
          <textarea
            name="lockedDescription"
            placeholder="Description bloquée"
            className="admin-panel__form__field"
          />
          <input
            type="text"
            name="latitude"
            placeholder="Latitude"
            className="admin-panel__form__field"
          />
          <input
            type="text"
            name="longitude"
            placeholder="Longitude"
            className="admin-panel__form__field"
          />
          <input
            type="text"
            name="testimony"
            placeholder="Témoignage"
            className="admin-panel__form__field"
          />
          <input
            type="text"
            name="hashtags"
            placeholder="Hashtags"
            className="admin-panel__form__field"
          />
          <button type="submit" className="admin-panel__form__submit-button">
            Envoyer
          </button>
        </form>

        <h3>Supprimer une installation</h3>
        <form
          action="/"
          onSubmit={deleteInstallation}
          ref={el => (this.deleteInstallationForm = el)}
          className="admin-panel__form"
        >
          <input
            type="text"
            name="id"
            placeholder="ID"
            required
            className="admin-panel__form__field"
          />
          <button type="submit" className="admin-panel__form__submit-button">
            Envoyer
          </button>
        </form>

        <h3>Ajouter une petition</h3>
        <form
          action="/"
          onSubmit={createPetition}
          ref={el => (this.createPetitionForm = el)}
          className="admin-panel__form"
        >
          <input
            type="text"
            name="subscribers"
            placeholder="Abonnés"
            className="admin-panel__form__field"
          />
          <input
            type="text"
            name="relatedInstallation"
            placeholder="Installation reliée"
            className="admin-panel__form__field"
          />
          <button type="submit" className="admin-panel__form__submit-button">
            Envoyer
          </button>
        </form>

        <h3>Supprimer une pétition</h3>
        <form
          action="/"
          onSubmit={deletePetition}
          ref={el => (this.deletePetitionForm = el)}
          className="admin-panel__form"
        >
          <input
            type="text"
            name="id"
            placeholder="ID"
            required
            className="admin-panel__form__field"
          />
          <button type="submit" className="admin-panel__form__submit-button">
            Envoyer
          </button>
        </form>
      </div>
    )
  }
}

export default Admin
