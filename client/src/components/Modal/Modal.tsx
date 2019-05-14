import React, { FunctionComponent, useState } from 'react'
import Button, { themes as ButtonThemes } from '../../components/Button/Button'
import './modal.scss'
import Classnames from 'classnames'

type Props = {
  className?: string
  modalTitle: string
  textContent: string
  onButtonClick?: any
  buttonLabel: string
}

const Modal: FunctionComponent<Props> = ({
  className,
  modalTitle,
  textContent,
  onButtonClick,
  buttonLabel,
}) => {
  let modal: HTMLDivElement | null = null

  const [isModalOpen, setIsModal] = useState(true)

  const clickButton = () => {
    if (onButtonClick) {
      onButtonClick()
    }
    if (modal) {
      setIsModal(false)
    }
  }

  return (
    <div
      className={Classnames(className, 'modal', { fade: !isModalOpen })}
      ref={el => (modal = el)}
    >
      <h3 className="modal__title">{modalTitle}</h3>
      <p className="modal__text-content">{textContent}</p>
      <Button
        onClick={clickButton}
        label={buttonLabel}
        theme={ButtonThemes.Blue}
        className={'informations-panel__set-direction-button'}
      />
    </div>
  )
}

export default Modal
