'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Trash2, Loader2, Plus, Pencil, Eye, EyeOff } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Evento {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  ubicacion: string;
  latitud?: number | null;
  longitud?: number | null;
  responsable: string;
  tipo: string;
  publicado: boolean;
}

const TIPOS = ['Dominical', 'Ministerial', 'Universitario', 'Charla', 'Especial'];

const INITIAL_FORM = {
  titulo: '',
  descripcion: '',
  fecha: '',
  ubicacion: '',
  latitud: '',
  longitud: '',
  responsable: '',
  tipo: 'Dominical',
};

type FormFields = typeof INITIAL_FORM;

export default function AdminEventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [form, setForm] = useState<FormFields>(INITIAL_FORM);
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const cargarEventos = () => {
    setCargando(true);
    fetch('/api/events')
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setEventos(json.data);
      })
      .finally(() => setCargando(false));
  };

  useEffect(cargarEventos, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = (evento: Evento) => {
    setEditandoId(evento.id);
    setForm({
      titulo: evento.titulo,
      descripcion: evento.descripcion,
      fecha: evento.fecha.slice(0, 16),
      ubicacion: evento.ubicacion,
      latitud: evento.latitud?.toString() ?? '',
      longitud: evento.longitud?.toString() ?? '',
      responsable: evento.responsable,
      tipo: evento.tipo,
    });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setForm(INITIAL_FORM);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    const body: Record<string, unknown> = {
      titulo: form.titulo,
      descripcion: form.descripcion,
      fecha: form.fecha,
      ubicacion: form.ubicacion,
      responsable: form.responsable,
      tipo: form.tipo,
    };

    if (form.latitud) body.latitud = parseFloat(form.latitud);
    if (form.longitud) body.longitud = parseFloat(form.longitud);

    try {
      const url = editandoId ? `/api/events?id=${editandoId}` : '/api/events';
      const method = editandoId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const json = await res.json();

      if (!res.ok) {
        alert(json.error || 'Error al guardar el evento');
        return;
      }

      setForm(INITIAL_FORM);
      setEditandoId(null);
      cargarEventos();
    } catch {
      alert('Error de conexión');
    } finally {
      setEnviando(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este evento?')) return;

    try {
      const res = await fetch(`/api/events?id=${id}`, { method: 'DELETE' });
      const json = await res.json();

      if (!res.ok) {
        alert(json.error || 'Error al eliminar');
        return;
      }

      setEventos((prev) => prev.filter((e) => e.id !== id));
    } catch {
      alert('Error de conexión');
    }
  };

  const handleTogglePublicado = async (evento: Evento) => {
    try {
      const res = await fetch(`/api/events?id=${evento.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicado: !evento.publicado }),
      });

      const json = await res.json();

      if (!res.ok) {
        alert(json.error || 'Error al cambiar estado');
        return;
      }

      setEventos((prev) =>
        prev.map((e) => (e.id === evento.id ? { ...e, publicado: !e.publicado } : e))
      );
    } catch {
      alert('Error de conexión');
    }
  };

  const formatearFecha = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('es-PE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <main className="bg-black text-white min-h-screen relative">
      <Navbar />
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-10">
            Administrar Eventos
          </h1>

          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#111] border border-gray-800 rounded-2xl p-6 md:p-8 mb-12"
          >
            <div className="flex items-center justify-between gap-2 mb-6 text-gray-300">
              <div className="flex items-center gap-2">
                {editandoId ? <Pencil size={18} /> : <Plus size={18} />}
                <h2 className="text-lg font-semibold">
                  {editandoId ? 'Editar Evento' : 'Nuevo Evento'}
                </h2>
              </div>
              {editandoId && (
                <button
                  type="button"
                  onClick={cancelarEdicion}
                  className="text-xs text-gray-500 hover:text-white transition-colors"
                >
                  Cancelar edición
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-1.5">
                  Título
                </label>
                <input
                  name="titulo"
                  value={form.titulo}
                  onChange={handleChange}
                  required
                  minLength={3}
                  className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gray-600 transition-colors"
                  placeholder="Servicio Dominical"
                />
              </div>

              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-1.5">
                  Tipo
                </label>
                <select
                  name="tipo"
                  value={form.tipo}
                  onChange={handleChange}
                  className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gray-600 transition-colors"
                >
                  {TIPOS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-1.5">
                  Fecha
                </label>
                <input
                  name="fecha"
                  type="datetime-local"
                  value={form.fecha}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-sm text-white [color-scheme:dark] focus:outline-none focus:border-gray-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-1.5">
                  Ubicación
                </label>
                <input
                  name="ubicacion"
                  value={form.ubicacion}
                  onChange={handleChange}
                  required
                  minLength={3}
                  className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gray-600 transition-colors"
                  placeholder="Sede Central — Lima"
                />
              </div>

              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-1.5">
                  Responsable
                </label>
                <input
                  name="responsable"
                  value={form.responsable}
                  onChange={handleChange}
                  required
                  minLength={3}
                  className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gray-600 transition-colors"
                  placeholder="Equipo de Alabanza"
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-1.5">
                  Latitud
                </label>
                <input
                  name="latitud"
                  type="number"
                  step="any"
                  value={form.latitud}
                  onChange={handleChange}
                  className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gray-600 transition-colors"
                  placeholder="-12.0464"
                />
              </div>

              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-1.5">
                  Longitud
                </label>
                <input
                  name="longitud"
                  type="number"
                  step="any"
                  value={form.longitud}
                  onChange={handleChange}
                  className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gray-600 transition-colors"
                  placeholder="-77.0428"
                />
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-1.5">
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  required
                  minLength={10}
                  rows={3}
                  className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gray-600 transition-colors resize-none"
                  placeholder="Descripción del evento..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={enviando}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-all disabled:opacity-50"
            >
              {enviando ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {editandoId ? 'Guardando...' : 'Creando...'}
                </>
              ) : (
                <>
                  {editandoId ? <Pencil size={16} /> : <Plus size={16} />}
                  {editandoId ? 'Guardar Cambios' : 'Crear Evento'}
                </>
              )}
            </button>
          </form>

          {/* Tabla de eventos */}
          <div className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800">
              <h2 className="text-lg font-semibold text-gray-200">
                Eventos Registrados
                <span className="ml-2 text-sm text-gray-500 font-normal">
                  ({eventos.length})
                </span>
              </h2>
            </div>

            {cargando ? (
              <div className="flex items-center justify-center gap-3 py-16 text-gray-500">
                <Loader2 size={20} className="animate-spin" />
                <span>Cargando eventos...</span>
              </div>
            ) : eventos.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                No hay eventos registrados. Crea el primero arriba.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-500 text-[10px] uppercase tracking-wider font-semibold">
                      <th className="text-left px-6 py-3">Título</th>
                      <th className="text-left px-6 py-3">Tipo</th>
                      <th className="text-left px-6 py-3">Fecha</th>
                      <th className="text-center px-6 py-3">Estado</th>
                      <th className="text-right px-6 py-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventos.map((evento) => (
                      <tr
                        key={evento.id}
                        className="border-b border-gray-900 hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-6 py-3 text-white font-medium">
                          {evento.titulo}
                        </td>
                        <td className="px-6 py-3 text-gray-400">
                          {evento.tipo}
                        </td>
                        <td className="px-6 py-3 text-gray-400">
                          {formatearFecha(evento.fecha)}
                        </td>
                        <td className="px-6 py-3 text-center">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider ${
                              evento.publicado
                                ? 'bg-green-900/50 text-green-400'
                                : 'bg-yellow-900/50 text-yellow-400'
                            }`}
                          >
                            {evento.publicado ? 'Publicado' : 'Borrador'}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleEdit(evento)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-blue-400 hover:bg-blue-500/10 border border-transparent hover:border-blue-500/30 transition-all"
                            >
                              <Pencil size={12} />
                              Editar
                            </button>
                            <button
                              onClick={() => handleTogglePublicado(evento)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs transition-all border ${
                                evento.publicado
                                  ? 'text-gray-400 hover:bg-gray-500/10 hover:border-gray-500/30 border-transparent'
                                  : 'text-green-400 hover:bg-green-500/10 hover:border-green-500/30 border-transparent'
                              }`}
                            >
                              {evento.publicado ? (
                                <><EyeOff size={12} /> Ocultar</>
                              ) : (
                                <><Eye size={12} /> Publicar</>
                              )}
                            </button>
                            <button
                              onClick={() => handleDelete(evento.id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-all"
                            >
                              <Trash2 size={12} />
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
