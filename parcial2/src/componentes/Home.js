import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, removePost } from "../features/postsSlice";
import { pushNotification, popNotification } from "../features/notiSlice";
import { enqueueDM, dequeueDM } from "../features/dmsSlice";
import { v4 as uuidv4 } from "uuid";

export default function Home(){
  const dispatch = useDispatch();
  const posts = useSelector(s => s.posts.list);
  const notifications = useSelector(s => s.notifications.stack);
  const queue = useSelector((s) => s.dm.queue);
  const [text, setText] = useState("");
  const [dmText, setDmText] = useState("");

  const author = useSelector(s => s.auth.user?.email ?? "anon");

  const handleAddPost = () => {
    if (!text) return;
    const p = { id: uuidv4(), author, text, createdAt: new Date().toISOString() };
    dispatch(addPost(p));
    dispatch(pushNotification({ id: uuidv4(), text: `Publicación de ${author}` }));
    setText("");
  };

  const handleRemovePost = (id) => {
    dispatch(removePost(id));
  };

  const handleSendDM = () => {
    if (!dmText) return;
    dispatch(enqueueDM({ id: uuidv4(), from: author, text: dmText }));
    setDmText("");
  };

  return (
    <div style={{display:'flex', gap:20, padding:20}}>
      <section style={{flex:1}}>
        <h4>Publicaciones (Lista)</h4>
        <div>
          <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Escribe..." />
          <br />
          <button onClick={handleAddPost}>Publicar</button>
        </div>
        <ul>
          {posts.map(p => (
            <li key={p.id} style={{border:'1px solid #ddd', margin:6, padding:6}}>
              <div><strong>{p.author}</strong> <small>{new Date(p.createdAt).toLocaleString()}</small></div>
              <div>{p.text}</div>
              <button onClick={()=>handleRemovePost(p.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </section>

      <aside style={{width:320}}>
        <div style={{marginBottom:20}}>
          <h4>Notificaciones (Pila)</h4>
            <div>Top: {notifications[0]?.text ?? "—"}</div>
            <button onClick={() => dispatch(popNotification())}>Sacar notificación (pop)</button>
            <ul>
            {notifications.map(n => (
                <li key={n.id}>{n.text} <small>({n.id.slice(0,6)})</small></li>
            ))}
            </ul>
        </div>

        <div>
          <h4>Mensajes pendientes (Cola)</h4>
          <div>
            <input placeholder="mensaje DM" value={dmText} onChange={e=>setDmText(e.target.value)} />
            <button onClick={handleSendDM}>Encolar DM</button>
            <button onClick={()=>dispatch(dequeueDM())}>Enviar/Sacar (dequeue)</button>
          </div>
          <ol>
            {queue.map(q => (
              <li key={q.id}><b>{q.from}</b>: {q.text}</li>
            ))}
          </ol>
        </div>
      </aside>
    </div>
  );
}
