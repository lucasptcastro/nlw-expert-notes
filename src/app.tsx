import { ChangeEvent, useState } from "react";
import logo from "./assets/logo-nlw-expert.svg";
import { NewNoteCard } from "./componentes/NewNoteCard";
import { NoteCard } from "./componentes/NoteCard";

interface INote {
  id: string;
  date: Date;
  content: string;
}

export function App() {
  const [search, setSearch] = useState<string>("");
  const [notes, setNotes] = useState<INote[]>(() => {
    // Verifica se há alguma nota no localstorage de navegador. Se sim, o estado de notes irá iniciar com o valor do item "notes" que está no localstorage
    const notesOnStorage = localStorage.getItem("notes");

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }

    return [];
  });

  function onNoteCreated(content: string) {
    const newNote: INote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    // As novas notas são adicionadas antes das antigas para que possam ser listadas pela data de "criação"
    const notesArray = [newNote, ...notes];

    setNotes(notesArray);

    localStorage.setItem("notes", JSON.stringify(notesArray));
  }

  function onNoteDeleted(id: string) {
    const notesArray = notes.filter((note) => {
      return note.id !== id;
    });

    setNotes(notesArray);
    localStorage.setItem("notes", JSON.stringify(notesArray));
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    setSearch(query);
  }

  // Filtra as notas de acordo com o conteúdo de cada uma, verificando o que foi passando no input tem no conteúdo de alguma nota
  const filteredNotes =
    search !== ""
      ? notes.filter((note) =>
          note.content.toLowerCase().includes(search.toLowerCase()),
        )
      : notes;

  return (
    <div className="mx-auto my-12 max-w-6xl space-y-6 px-5">
      <img src={logo} alt="NLW Expert" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque as suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />

      {/* auto-rows é basicamente o tamanho dos componentes que estarão no grid */}
      <div className="grid auto-rows-[250px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
        ))}
      </div>
    </div>
  );
}
