import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { close } from './svgIconList';

export default function PusherAlertModal(props: any) {
    const { data, modal, closeModal } = props;
    // const [modal, setModal] = React.useState(false);
    // React.useEffect(() => {
    //     if (data) {
    //         setModal(true);
    //     }
    // }, [data]);
    // const closeModal = () => setModal(!modal);
    return (
        <Modal isOpen={modal} toggle={closeModal}>
            <ModalHeader>
                {'Notification'}
                <span onClick={closeModal} className="position-absolute close">
                    {close}
                </span>
            </ModalHeader>
            <ModalBody>{data ? data.message : ''}</ModalBody>
            <ModalFooter className="pt-0 border-0">
                <Button color="secondary" onClick={closeModal}>
                    OK
                </Button>
            </ModalFooter>
        </Modal>
    );
}
