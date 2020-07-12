import React, { useState } from "react";
import { socketEmit } from "../api";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

function RoomSetup() {
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [isModalOpen, setModalIsOpen] = useState(true);

    const sendVariant = (variant) => {
        socketEmit("room/set-variant", variant, (acknowledgement) => {
            if (!acknowledgement.ok) {
                setSelectedVariant(null);
                setModalIsOpen(false);
            }
        });
    };

    return (
        <Modal isOpen={isModalOpen} size="lg">
            <ModalHeader>Which game would you like to play?</ModalHeader>
            <ModalBody>
                <Button
                    size="lg"
                    block
                    onClick={() => setSelectedVariant(1)}
                    active={selectedVariant === 1}
                    disabled>
                    Portes
                </Button>
                <Button
                    size="lg"
                    block
                    onClick={() => setSelectedVariant(2)}
                    active={selectedVariant === 2}>
                    Plakoto
                </Button>
                <Button
                    size="lg"
                    block
                    onClick={() => setSelectedVariant(3)}
                    active={selectedVariant === 3}
                    disabled>
                    Fevga
                </Button>
            </ModalBody>
            <ModalFooter>
                <Button size="lg" color="primary" onClick={sendVariant} disabled={!selectedVariant}>
                    I’m ready!
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default RoomSetup;
