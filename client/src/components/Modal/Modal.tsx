import React, { FunctionComponent } from 'react'
import { observer } from 'mobx-react-lite'
import Button, { themes as ButtonThemes } from '../../components/Button/Button'
import './modal.scss'

type Props = {
  className?: string
  modalTitle: string
  textContent: string
  onButtonClick?: any
  buttonTitle: string
}

const Modal: FunctionComponent<Props> = ({
  className,
  modalTitle,
  textContent,
  onButtonClick,
  buttonTitle,
}) => {
  let modal: HTMLDivElement | null = null

  const clickButton = () => {
    if (onButtonClick) {
      onButtonClick()
    }
    if (modal) {
      modal.classList.add('hidden')
    }
  }

  return (
    <div className="modal" ref={el => (modal = el)}>
      <h3 className="modal__title">{modalTitle}</h3>
      <p className="modal__text-content">{textContent}</p>
      <Button
        onClick={clickButton}
        label={buttonTitle}
        theme={ButtonThemes.Blue}
        className={'informations-panel__set-direction-button'}
      />
    </div>
  )
}

export default observer(Modal)
