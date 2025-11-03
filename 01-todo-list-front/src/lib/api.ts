export type Todo = { id: string; title: string; done: boolean };

const API = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(API + path, {
    headers: { 'content-type': 'application/json', ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text().catch(()=>res.statusText)}`);
  return res.status === 204 ? (undefined as T) : await res.json();
}

export const api = {
  list: () => http<Todo[]>('/todos'),
  create: (data: Pick<Todo, 'title' | 'done'>) =>
    http<Todo>('/todos', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Pick<Todo, 'title' | 'done'>>) =>
    http<Todo>(`/todos/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  remove: (id: string) =>
    http<void>(`/todos/${id}`, { method: 'DELETE' }),
};
