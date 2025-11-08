import { Card } from "react-bootstrap";
import { useScheduleHook } from "../../hooks/useCadsHook";

interface EventCardProps {
  category: string;
  title: string;
  date: string;
  description: string;
}

export function EventCard({ category, title, date, description }: EventCardProps) {
  return (
    <Card className="p-3 shadow-sm border-0" style={{ borderRadius: "10px" }}>
      <small className="text-muted">{category}</small>

      <Card.Title className="fw-bold mt-1">{title}</Card.Title>

      <p className="text-success fw-semibold mb-2">{date}</p>

      <Card.Text className="text-secondary">
        {description}
      </Card.Text>
    </Card>
  );
}

interface TaskItem {
  date: string;
  title: string;
}

interface MyScheduleProps {
  tasks: TaskItem[];
}

export function MyScheduleCard({ tasks }: MyScheduleProps) {
  const {} = useScheduleHook();
  return (
    <Card className="p-3 shadow-sm border-0" style={{ borderRadius: "10px" }}>
      <h5 className="fw-bold mb-3">
        <span role="img" aria-label="estrela">🌟</span> Minha Escala (Próximas Tarefas)
      </h5>

      {tasks.map((t, index) => (
        <div key={index} className="mb-2 pb-2 border-bottom">
          <strong className="text-primary">{t.date}:</strong> {t.title}
        </div>
      ))}
    </Card>
  );
}

interface NoticeItem {
  text: string;
  author: string;
  date: string;
}

interface QuickNoticeBoardProps {
  notices: NoticeItem[];
}

export function MyNoticesCard({ notices }: QuickNoticeBoardProps) {
  return (
    <Card className="p-3 shadow-sm border-0" style={{ borderRadius: "10px" }}>
      <h5 className="fw-bold mb-3">
        <span role="img" aria-label="megafone">📢</span> Mural de Avisos Rápidos
      </h5>

      {notices.map((n, index) => (
        <div key={index} className="mb-3 pb-2 border-bottom">
          <p className="mb-1">{n.text}</p>
          <small className="text-muted">
            Postado por: {n.author} - {n.date}
          </small>
        </div>
      ))}
    </Card>
  );
}