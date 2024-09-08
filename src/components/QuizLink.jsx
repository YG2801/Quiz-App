import { Link } from 'react-router-dom';

export default function QuizLink({ id, title, image }) {
  return (
    <Link
      to={`/quiz?id=${id}`}
      className="group mb-2 flex items-center gap-4 rounded-lg bg-[#3c4d67] p-2 transition-colors hover:bg-[#4a596f]"
    >
      <div className="size-10 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="size-full object-cover transition-transform group-hover:scale-125"
        />
      </div>
      <p className="font-semibold">{title}</p>
    </Link>
  );
}
