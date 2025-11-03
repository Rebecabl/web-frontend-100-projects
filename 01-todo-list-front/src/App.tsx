import { useEffect, useMemo, useState } from 'react'
import { api, type Todo } from './lib/api'
import { Plus, Trash2, Calendar, TrendingUp, Moon, Sun } from 'lucide-react'

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState<'all'|'active'|'completed'>('all')
  const [dark, setDark] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => { void load() }, [])
  async function load() {
    try {
      setLoading(true); setError(null)
      const data = await api.list()
      setTodos(data)
    } catch (e:any) {
      setError(e?.message || 'Erro ao carregar')
    } finally { setLoading(false) }
  }

  async function addTodo() {
    const title = input.trim()
    if (!title) return
    try {
      setError(null)
      const created = await api.create({ title, done: false })
      setTodos(prev => [created, ...prev])
      setInput('')
    } catch (e:any) {
      setError(e?.message || 'Erro ao criar')
    }
  }

  async function toggleTodo(id: string, done: boolean) {
    try {
      setError(null)
      const updated = await api.update(id, { done: !done })
      setTodos(prev => prev.map(t => t.id === id ? updated : t))
    } catch (e:any) {
      setError(e?.message || 'Erro ao atualizar')
    }
  }

  async function removeTodo(id: string) {
    try {
      setError(null)
      await api.remove(id)
      setTodos(prev => prev.filter(t => t.id !== id))
    } catch (e:any) {
      setError(e?.message || 'Erro ao excluir')
    }
  }

  const filtered = useMemo(() => {
    if (filter === 'active') return todos.filter(t => !t.done)
    if (filter === 'completed') return todos.filter(t => t.done)
    return todos
  }, [todos, filter])

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.done).length,
    completed: todos.filter(t => t.done).length,
    completionRate: todos.length ? Math.round(todos.filter(t => t.done).length / todos.length * 100) : 0
  }

  return (
    <div className={dark ? 'min-h-screen bg-slate-900' : 'min-h-screen bg-slate-50'}>
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className={dark ? 'text-3xl font-bold text-white' : 'text-3xl font-bold text-slate-900'}>Minhas Tarefas</h1>
            <p className={dark ? 'text-slate-400' : 'text-slate-600'}>
              {new Date().toLocaleDateString('pt-BR', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDark(v => !v)}
              className={dark ? 'rounded-xl bg-slate-800 p-3 text-yellow-400' : 'rounded-xl border border-slate-200 bg-white p-3 text-slate-600 shadow-sm'}
              title="Alternar tema"
            >
              {dark ? <Sun size={18}/> : <Moon size={18}/>}
            </button>
            <div className={dark ? 'rounded-xl border border-slate-700 bg-slate-800 px-5 py-3' : 'rounded-xl bg-white px-5 py-3 shadow-sm'}>
              <div className="flex items-center gap-2">
                <TrendingUp className="text-blue-600" size={18}/>
                <div className={dark ? 'text-white font-semibold' : 'text-slate-900 font-semibold'}>
                  {stats.completionRate}% concluído
                </div>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className={dark ? 'mb-6 h-2 w-full overflow-hidden rounded-full bg-slate-700' : 'mb-6 h-2 w-full overflow-hidden rounded-full bg-slate-200'}>
          <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all" style={{ width: `${stats.completionRate}%` }}/>
        </div>

        {/* Cards de stats */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          <div className={dark ? 'rounded-xl border border-slate-700 bg-slate-800 p-4' : 'rounded-xl border border-slate-200 bg-white p-4 shadow-sm'}>
            <div className={dark ? 'text-slate-400 text-sm' : 'text-slate-500 text-sm'}>Total</div>
            <div className={dark ? 'text-2xl font-bold text-white' : 'text-2xl font-bold text-slate-900'}>{stats.total}</div>
          </div>
          <div className={dark ? 'rounded-xl border border-slate-700 bg-slate-800 p-4' : 'rounded-xl border border-slate-200 bg-white p-4 shadow-sm'}>
            <div className={dark ? 'text-slate-400 text-sm' : 'text-slate-500 text-sm'}>Ativas</div>
            <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
          </div>
          <div className={dark ? 'rounded-xl border border-slate-700 bg-slate-800 p-4' : 'rounded-xl border border-slate-200 bg-white p-4 shadow-sm'}>
            <div className={dark ? 'text-slate-400 text-sm' : 'text-slate-500 text-sm'}>Concluídas</div>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          </div>
        </div>

        {}
        <div className={dark ? 'mb-6 rounded-xl border border-slate-700 bg-slate-800 p-4' : 'mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm'}>
          <div className="flex gap-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTodo()}
              placeholder="Adicionar nova tarefa..."
              className={dark
                ? 'flex-1 rounded-lg bg-slate-700 px-4 py-3 text-white placeholder-slate-400 outline-none ring-2 ring-transparent focus:ring-blue-500'
                : 'flex-1 rounded-lg bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 outline-none ring-2 ring-transparent focus:ring-blue-500'}
            />
            <button
              onClick={addTodo}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition-colors hover:bg-blue-700"
            >
              <Plus size={18}/> Adicionar
            </button>
          </div>
        </div>

        {}
        <div className="mb-6 flex gap-2">
          {(['all','active','completed'] as const).map(key => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={
                filter === key
                  ? 'rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-sm'
                  : dark
                    ? 'rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 font-medium text-slate-300 hover:bg-slate-700'
                    : 'rounded-lg border border-slate-200 bg-white px-4 py-2 font-medium text-slate-600 hover:bg-slate-50'
              }
            >
              {key === 'all' ? 'Todas' : key === 'active' ? 'Ativas' : 'Concluídas'}
            </button>
          ))}
        </div>

        {}
        <div className="space-y-3">
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <div className={dark ? 'text-slate-300' : 'text-slate-600'}>Carregando…</div>
          ) : filtered.length === 0 ? (
            <div className={dark ? 'rounded-xl border border-slate-700 bg-slate-800 p-12 text-center' : 'rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm'}>
              <Calendar className={dark ? 'mx-auto mb-3 text-slate-600' : 'mx-auto mb-3 text-slate-300'} size={42}/>
              <p className={dark ? 'text-slate-400' : 'text-slate-500'}>
                {filter === 'all' ? 'Nenhuma tarefa ainda. Adicione uma para começar!' :
                 filter === 'active' ? 'Nenhuma tarefa ativa!' : 'Nenhuma tarefa concluída ainda!'}
              </p>
            </div>
          ) : (
            filtered.map(t => (
              <div
                key={t.id}
                className={dark
                  ? 'group rounded-xl border border-slate-700 bg-slate-800 p-4 transition-all hover:shadow'
                  : 'group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md'}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={t.done}
                    onChange={() => toggleTodo(t.id, t.done)}
                    className="h-5 w-5 cursor-pointer rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className={t.done ? (dark ? 'flex-1 text-slate-400 line-through' : 'flex-1 text-slate-500 line-through') : (dark ? 'flex-1 text-slate-100' : 'flex-1 text-slate-800')}>
                    {t.title}
                  </span>
                  <button
                    onClick={() => removeTodo(t.id)}
                    className="rounded-lg p-2 text-red-500 opacity-0 transition-all hover:bg-red-50 group-hover:opacity-100"
                    title="Excluir"
                  >
                    <Trash2 size={18}/>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
