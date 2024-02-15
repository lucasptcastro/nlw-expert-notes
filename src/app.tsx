import logo from "./assets/logo-nlw-expert.svg";
import { NewNoteCard } from "./componentes/NewNoteCard";
import { NoteCard } from "./componentes/NoteCard";

export function App() {
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="NLW Expert" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque as suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
        />
      </form>

      <div className="h-px bg-slate-700" />

      {/* auto-rows é basicamente o tamanho dos componentes que estarão no grid */}
      <div className="grid grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard />

        <NoteCard
          note={{
            date: new Date(),
            content:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus officiis doloribus ipsam sunt dicta saepe ex labore, nihil minus delectus doloremque beatae, reiciendis aliquid. Quae ratione suscipit totam odit enim!",
          }}
        />
      </div>
    </div>
  );
}
