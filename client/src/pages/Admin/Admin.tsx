import React, { Component, createRef } from 'react';
import { Transition } from 'react-transition-group';
import { TweenLite } from 'gsap';
import ApiClient from '../../ApiClient/ApiClient';
import { ApiBench } from '../../@types';

type props = {
  show: boolean,
}

class Admin extends Component<props> {
  createBenchForm: HTMLFormElement | null = null;
  updateBenchForm: HTMLFormElement | null = null;
  deleteBenchForm: HTMLFormElement | null = null;

  constructor(props: props) {
    super(props)
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
          const request = await (ApiClient.createBench({
            name: name,
            description: description,
            lockedDescription: lockedDescription,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
          }))

          console.log(request)
        } else {
          console.log("Tout les champs sont nécessaires pour ajouter une nouvelle installation")
        }
      }
    }

    const updateBench = (e: React.FormEvent<HTMLFormElement>) => {
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

        ApiClient.updateBench(fieldsToUpdate)
      }
    }

    const deleteBench = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (this.deleteBenchForm) {
        const id: string = (this.deleteBenchForm.querySelector('[name="id"]') as HTMLInputElement).value

        ApiClient.deleteBench(id)
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
          <h3>Ajouter une installation</h3>
          <form action="/" onSubmit={createBench} ref={el => this.createBenchForm = el}>
            <input type="text" name="name" placeholder="Nom" required />
            <textarea name="description" placeholder="Description" required ></textarea>
            <textarea name="lockedDescription" placeholder="Description bloquée" required ></textarea>
            <input type="text" name="latitude" placeholder="Latitude"  required />
            <input type="text" name="longitude" placeholder="Longitude"  required />
            <button type="submit">Envoyer</button>
          </form>

          <h3>Mettre à jour une installation</h3>
          <form action="/" onSubmit={updateBench} ref={el => this.updateBenchForm = el}>
            <input type="text" name="id" placeholder="ID" required/>
            <input type="text" name="name" placeholder="Nom" />
            <textarea name="description" placeholder="Description" ></textarea>
            <textarea name="lockedDescription" placeholder="Description bloquée" ></textarea>
            <input type="text" name="latitude" placeholder="Latitude" />
            <input type="text" name="longitude" placeholder="Longitude" />
            <button type="submit">Envoyer</button>
          </form>

          <h3>Supprimer une installation</h3>

          <form action="/" onSubmit={deleteBench} ref={el => this.deleteBenchForm = el}>
            <input type="text" name="id" placeholder="ID" required/>
            <button type="submit">Envoyer</button>
          </form>
        </div>
      </Transition>

    )
  }
}

export default Admin;