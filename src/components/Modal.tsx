import { ReactChild } from 'react'
import './Modal.module.scss'

interface PresentationalComponentProps {
  children: ReactChild | ReactChild[]
}

function Modal({ children }: PresentationalComponentProps) {
  return <div className="box modal-component">{children}</div>
}

Modal.Header = function ModalHeader({
  children
}: PresentationalComponentProps) {
  return <div className="modal-component__header">{children}</div>
}

Modal.Title = function ModalTitle({ children }: PresentationalComponentProps) {
  return <div className="modal-component__title">{children}</div>
}

Modal.Content = function ModalContent({
  children
}: PresentationalComponentProps) {
  return <div className="modal-component__content">{children}</div>
}

Modal.Footer = function ModalFooter({
  children
}: PresentationalComponentProps) {
  return (
    <div className="modal-component__footer is-clearfix">
      <div className="field is-pulled-right is-grouped">{children}</div>
    </div>
  )
}

export default Modal
