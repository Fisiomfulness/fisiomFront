"use client";
import { FaCircleCheck } from "react-icons/fa6";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Chip,
  Button,
  useDisclosure,
  RadioGroup,
  Radio,
  Spinner,
} from "@nextui-org/react";
import { useState } from "react";

const ServicioReportComentario = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selected, setSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reported, setReported] = useState(false);

  const handleReport = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    setReported(true);
    setTimeout(() => {
      onClose();
    }, 5000);
  };

  return (
    <div>
      <Chip
        onClick={onOpen}
        size="sm"
        variant="flat"
        color="danger"
        className="mr-4 cursor-pointer"
      >
        Reportar
      </Chip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} backdrop={"blur"} >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Reporte comentario
              </ModalHeader>
              <ModalBody>
                {!reported && (
                  <RadioGroup
                    label="Seleccione el motivo"
                    color="primary"
                    value={selected}
                    onValueChange={setSelected}
                  >
                    <Radio value="Spam">Spam</Radio>
                    <Radio value="Comentario abusivo/ofensivo">
                      Comentario abusivo/ofensivo
                    </Radio>
                    <Radio value="Incitación al odio">Incitación al odio</Radio>
                  </RadioGroup>
                )}
                {isLoading && <Spinner />}

                {reported && !isLoading && (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <h1>Reporte Enviado</h1>
                    <FaCircleCheck size={40} color="#36A793" />
                    <h3 className="font-bold">Motivo: {selected}</h3>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <div className="flex items-center gap-2">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  {!reported ? (
                    <Button
                      color="primary"
                      onPress={() => handleReport(onClose)}
                    >
                      Enviar
                    </Button>
                  ) : (
                    <Chip size="sm" color="danger">
                      Sujeto a revisión
                    </Chip>
                  )}
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ServicioReportComentario;
