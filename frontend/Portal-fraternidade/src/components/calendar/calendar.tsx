import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import ptLocale from '@fullcalendar/core/locales/pt-br'
import "./calendarDesign.css"
import { useCalendar } from "../../hooks/useCalendarHook";
import { Button, Modal } from "react-bootstrap";
import { handleNavigate } from "../../hooks/useUtilHook";

export function CalendarComp() {

  const {month, handleNext, handlePrev, updateTitle, calendarRef, activityList, setEventoSelecionado, setShowModal, showModal, eventoSelecionado} = useCalendar();
  const {goingAhead} = handleNavigate();
  return (    
    <>
          <div
        style={{
          width: "90%",
          margin: "5rem auto",
          padding: "20px",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px"
          }}
        >
          <button className="nav-btn" onClick={handlePrev} id="prev">◀</button>

          <h2 id="calendar-title">{month}</h2>

          <button className="nav-btn" onClick={handleNext} id="next">▶</button>

          <Button variant="primary"  onClick={() => goingAhead("AgendaNovoEvento")} >Nova Atividade</Button>
        </div>
       
          <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          editable = {true}
          selectable= {true}
          eventResizableFromStart = {true}
          initialView="dayGridMonth"
          locale={ptLocale}
          headerToolbar={false}
          events={activityList} 
          eventClick={(info) => {
            info.jsEvent.preventDefault();
            console.log(info)
            setEventoSelecionado({
              id: info.event.id,
              title: info.event.title,
              start: info.event.startStr,
              
              ...info.event.extendedProps,
            });

            setShowModal(true);
          }
        }        
          datesSet={updateTitle} 
        />        
    </div>
        <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{eventoSelecionado?.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <p><strong>DIRIGENTE:</strong> {eventoSelecionado?.leader.name}</p>
        <p><strong>EVANGELHO:</strong> {eventoSelecionado?.gospel.name}</p>
        <p><strong>VIBRAÇÕES:</strong> {eventoSelecionado?.vibration.name}</p>
        <p><strong>RECEPÇÃO / FILA:</strong> {eventoSelecionado?.frontDesk.name}</p>
        <p><strong>LEITURA:</strong> {eventoSelecionado?.reading.name}</p>
        <p><strong>DIRIGENTE PASSE:</strong> {eventoSelecionado?.passManager.name}</p>
        <p><strong>SOM / IMAGEM:</strong> {eventoSelecionado?.soundAndImage.name}</p>

        <hr />

        <h5>Tema do Evangelho</h5>
        <p>{eventoSelecionado?.themeGospel}</p>
        <p><em>{eventoSelecionado?.temaTexto}</em></p>

      </Modal.Body>

      <Modal.Footer>
        <Button variant="success" onClick={() => goingAhead(`AgendaNovoEvento/${eventoSelecionado?.meetingId}`)}>
          Editar Atividade
        </Button>

        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
    </>

  )
}
 
