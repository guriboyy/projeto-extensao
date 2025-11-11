
import moment from 'moment';
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css"
import '../../pages/calendar/calendar-custom.css'

 
const DragAndDropCalendar = withDragAndDrop(Calendar)
const localizer = momentLocalizer(moment)

export function CalendarComp() {
  return (
    
    
    <div>
        <DragAndDropCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={[{}]}
        localizer = {localizer}
        resizable
        className="calendar">

        </DragAndDropCalendar>
    </div>
    
  )
}
 
