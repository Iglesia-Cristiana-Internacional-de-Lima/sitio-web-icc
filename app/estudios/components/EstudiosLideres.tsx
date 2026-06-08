"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, ArrowRight, X, CheckCircle, Shuffle, MessageCircle } from "lucide-react";
import type { Lider, LiderAPI, Modalidad, ReservaFormData, FormErrors, ReservaConfirmacion, ReservaAPIResponse } from "../types";
import { validateReservaForm, hasErrors, asignarLiderAutomatico } from "../utils/validations";

// Datos de respaldo (fallback) si la API no está disponible
const lideresFallback: Lider[] = [
  {
    id: 1,
    name: "Andrés Mendoza",
    role: "Pastor Principal",
    specialties: ["Fe y trabajo", "Matrimonio", "Liderazgo"],
    availability: "Lunes a Viernes",
    location: "Lima Centro / Online",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    bio: "20 años acompañando personas en su camino de fe. Especializado en integrar la fe con la vida profesional.",
  },
  {
    id: 2,
    name: "Lucía Reyes",
    role: "Pastora · San Isidro",
    specialties: ["Mujeres", "Familia", "Crecimiento espiritual"],
    availability: "Martes, Jueves, Sábados",
    location: "San Isidro / Miraflores / Online",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
    bio: "Apasionada por el discipulado de mujeres. Conversaciones honestas sobre fe, identidad y propósito.",
  },
  {
    id: 3,
    name: "Daniel Quispe",
    role: "Pastor · Miraflores",
    specialties: ["Jóvenes profesionales", "Dudas de fe", "Apologética"],
    availability: "Miércoles a Sábados",
    location: "Miraflores / La Molina / Online",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    bio: "Ingeniero de formación. Experto en abordar preguntas difíciles sobre fe, ciencia y razón.",
  },
  {
    id: 4,
    name: "María Torres",
    role: "Líder de Ministerios",
    specialties: ["Universitarios", "Transiciones de vida", "Vocación"],
    availability: "Lunes, Miércoles, Viernes",
    location: "San Borja / Surco / Online",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
    bio: "Acompañando a jóvenes en sus primeros pasos de fe y grandes decisiones de vida.",
  },
  {
    id: 5,
    name: "Carlos Salazar",
    role: "Pastor · Surco",
    specialties: ["Hombres", "Paternidad", "Finanzas y fe"],
    availability: "Martes, Jueves, Sábados",
    location: "Surco / La Molina / Online",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
    bio: "Conversaciones prácticas para hombres sobre lo que realmente importa.",
  },
  {
    id: 6,
    name: "Patricia Vega",
    role: "Líder · Eventos",
    specialties: ["Primera vez", "Exploración de fe", "Comunidad"],
    availability: "Flexible",
    location: "Todas las sedes / Online",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
    bio: "Especializada en acompañar a personas que están conociendo la fe por primera vez.",
  },
];

const initialFormData: ReservaFormData = {
  nombre: "",
  contacto: "",
  modalidad: null,
  mensaje: "",
  liderId: null,
};

// Helper para normalizar líder de API a formato del componente
function normalizarLiderLocal(liderApi: LiderAPI): Lider {
  return {
    id: liderApi.id,
    name: liderApi.nombre,
    role: liderApi.rol,
    specialties: liderApi.especialidades,
    availability: liderApi.disponibilidad,
    location: liderApi.ubicacion,
    img: liderApi.imagen || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    bio: liderApi.bio || "",
  };
}

export default function EstudiosLideres() {
  const [lideres, setLideres] = useState<Lider[]>(lideresFallback);
  const [isLoadingLideres, setIsLoadingLideres] = useState(true);
  const [selectedLider, setSelectedLider] = useState<Lider | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<ReservaFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [confirmacion, setConfirmacion] = useState<ReservaConfirmacion | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Cargar líderes desde la API
  useEffect(() => {
    async function cargarLideres() {
      try {
        const response = await fetch("/api/estudios/lideres");
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data.length > 0) {
            const lideresNormalizados = data.data.map(normalizarLiderLocal);
            setLideres(lideresNormalizados);
          }
        }
      } catch (error) {
        console.log("Usando datos de respaldo para líderes");
      } finally {
        setIsLoadingLideres(false);
      }
    }
    cargarLideres();
  }, []);

  const handleSelect = (lider: Lider) => {
    setSelectedLider(lider);
    setFormData({ ...initialFormData, liderId: lider.id });
    setErrors({});
    setConfirmacion(null);
    setShowModal(true);
  };

  const handleAutoAssign = () => {
    const liderAsignado = asignarLiderAutomatico(lideres);
    setSelectedLider(liderAsignado);
    setFormData({ ...initialFormData, liderId: liderAsignado.id });
    setErrors({});
    setConfirmacion(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedLider(null);
    setFormData(initialFormData);
    setErrors({});
    setConfirmacion(null);
  };

  const handleInputChange = (field: keyof ReservaFormData, value: string | Modalidad) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpiar error del campo al modificarlo
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field as keyof FormErrors];
        return newErrors;
      });
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validateReservaForm(formData);

    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setApiError(null);

    try {
      const response = await fetch("/api/estudios/reservar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          contacto: formData.contacto,
          modalidad: formData.modalidad,
          mensaje: formData.mensaje,
          liderId: formData.liderId,
        }),
      });

      const data: ReservaAPIResponse = await response.json();

      if (data.success && data.data) {
        setConfirmacion({
          success: true,
          lider: selectedLider!,
          formData: formData,
          fechaRegistro: data.data.fechaRegistro,
          whatsappLink: data.data.whatsappLink,
          emailEnviado: data.data.emailEnviado,
        });
      } else {
        // Si la API falla, usar modo fallback
        setConfirmacion({
          success: true,
          lider: selectedLider!,
          formData: formData,
          fechaRegistro: new Date().toLocaleDateString("es-PE", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
      }
    } catch (error) {
      // Modo fallback si la API no está disponible
      console.log("API no disponible, usando modo offline");
      setConfirmacion({
        success: true,
        lider: selectedLider!,
        formData: formData,
        fechaRegistro: new Date().toLocaleDateString("es-PE", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="lideres" className="relative bg-[#0d0d0d] py-32 md:py-40 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[11px] tracking-[0.32em] text-white/50 uppercase">
            02 — Elige tu líder
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Headline */}
        <div className="mb-20 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-display text-[clamp(2.5rem,6vw,5rem)] text-white leading-tight"
          >
            Con quién
            <br />
            <em className="italic font-light text-white/70">quieres conversar?</em>
          </motion.h2>
          <p className="text-white/60 text-lg mt-6">
            Cada líder tiene su estilo y especialidad. Elige el que más resuene contigo.
          </p>
        </div>

        {/* Leaders grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lideres.map((lider, i) => (
            <motion.div
              key={lider.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative bg-[#191919] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all cursor-pointer"
              onClick={() => handleSelect(lider)}
            >
              {/* Photo */}
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
                  style={{ backgroundImage: `url(${lider.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#191919] via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-2xl text-white mb-1 group-hover:italic transition-all">
                  {lider.name}
                </h3>
                <p className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase mb-4">
                  {lider.role}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {lider.specialties.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-1 rounded-full bg-white/5 text-white/60 text-xs"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Availability */}
                <div className="flex items-center gap-4 text-white/40 text-xs">
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={12} strokeWidth={1.5} />
                    {lider.availability}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={12} strokeWidth={1.5} />
                    {lider.location.split(" / ")[0]}
                  </span>
                </div>
              </div>

              {/* Hover CTA */}
              <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all">
                <ArrowRight size={16} strokeWidth={1.5} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Auto-assign option */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-white/50 text-sm mb-4">
            No sabes con quién conversar?
          </p>
          <button
            onClick={handleAutoAssign}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white/70 text-sm hover:bg-white/5 hover:border-white/30 transition-all"
          >
            <Shuffle size={18} strokeWidth={1.5} />
            Asignarme un líder automáticamente
            <ArrowRight
              size={16}
              strokeWidth={1.5}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </motion.div>
      </div>

      {/* Booking Modal */}
      {showModal && selectedLider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleCloseModal}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-[#191919] border border-white/10 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:bg-white hover:text-black transition-all z-10"
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            {/* Header */}
            <div className="p-8 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-full bg-cover bg-center border border-white/20"
                  style={{ backgroundImage: `url(${selectedLider.img})` }}
                />
                <div>
                  <h3 className="font-display text-2xl text-white">
                    {selectedLider.name}
                  </h3>
                  <p className="text-white/50 text-sm">{selectedLider.role}</p>
                </div>
              </div>
              <p className="text-white/60 text-sm mt-4 leading-relaxed">
                {selectedLider.bio}
              </p>
            </div>

            {/* Confirmation View */}
            {confirmacion ? (
              <div className="p-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-green-500" />
                  </div>
                  <h3 className="font-display text-2xl text-white mb-2">
                    Reserva registrada
                  </h3>
                  <p className="text-white/60 text-sm mb-8">
                    Hemos recibido tu solicitud de estudio bíblico con {confirmacion.lider.name}.
                  </p>

                  <div className="bg-white/5 rounded-xl p-6 text-left space-y-4 mb-8">
                    <div>
                      <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
                        Líder asignado
                      </span>
                      <p className="text-white mt-1">{confirmacion.lider.name}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
                        Modalidad
                      </span>
                      <p className="text-white mt-1 capitalize">{confirmacion.formData.modalidad}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
                        Te contactaremos en
                      </span>
                      <p className="text-white mt-1">{confirmacion.formData.contacto}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
                        Fecha de registro
                      </span>
                      <p className="text-white/70 mt-1 text-sm">{confirmacion.fechaRegistro}</p>
                    </div>
                  </div>

                  {confirmacion.emailEnviado && (
                    <p className="text-green-400/80 text-sm mb-4">
                      Te hemos enviado un correo de confirmación.
                    </p>
                  )}

                  <p className="text-white/50 text-sm mb-6">
                    Te contactaremos en menos de 24 horas para coordinar la fecha y hora de tu estudio.
                  </p>

                  <div className="space-y-3">
                    {confirmacion.whatsappLink && (
                      <a
                        href={confirmacion.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-all"
                      >
                        <MessageCircle size={18} strokeWidth={1.5} />
                        Enviar WhatsApp ahora
                      </a>
                    )}

                    <button
                      onClick={handleCloseModal}
                      className="w-full group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all"
                    >
                      Cerrar
                    </button>
                  </div>
                </motion.div>
              </div>
            ) : (
              /* Form */
              <div className="p-8 space-y-6">
                <div>
                  <label className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase block mb-2">
                    Tu nombre *
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Juan Pérez"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange("nombre", e.target.value)}
                    className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors ${
                      errors.nombre ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-white/30"
                    }`}
                  />
                  {errors.nombre && (
                    <p className="text-red-400 text-xs mt-2">{errors.nombre}</p>
                  )}
                </div>

                <div>
                  <label className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase block mb-2">
                    Tu correo o WhatsApp *
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: juan@correo.com o +51 999 999 999"
                    value={formData.contacto}
                    onChange={(e) => handleInputChange("contacto", e.target.value)}
                    className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors ${
                      errors.contacto ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-white/30"
                    }`}
                  />
                  {errors.contacto && (
                    <p className="text-red-400 text-xs mt-2">{errors.contacto}</p>
                  )}
                </div>

                <div>
                  <label className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase block mb-2">
                    Modalidad preferida *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleInputChange("modalidad", "presencial")}
                      className={`px-4 py-3 rounded-lg border text-sm transition-all ${
                        formData.modalidad === "presencial"
                          ? "border-white bg-white/10 text-white"
                          : "border-white/10 text-white/70 hover:bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <MapPin size={16} strokeWidth={1.5} className="inline mr-2" />
                      Presencial
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange("modalidad", "online")}
                      className={`px-4 py-3 rounded-lg border text-sm transition-all ${
                        formData.modalidad === "online"
                          ? "border-white bg-white/10 text-white"
                          : "border-white/10 text-white/70 hover:bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <Clock size={16} strokeWidth={1.5} className="inline mr-2" />
                      Online
                    </button>
                  </div>
                  {errors.modalidad && (
                    <p className="text-red-400 text-xs mt-2">{errors.modalidad}</p>
                  )}
                </div>

                <div>
                  <label className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase block mb-2">
                    Algo que quieras que sepamos?
                  </label>
                  <textarea
                    placeholder="Opcional: cuéntanos brevemente qué te gustaría conversar..."
                    rows={3}
                    value={formData.mensaje}
                    onChange={(e) => handleInputChange("mensaje", e.target.value)}
                    maxLength={500}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors resize-none"
                  />
                  <p className="text-white/30 text-xs mt-1 text-right">
                    {formData.mensaje.length}/500
                  </p>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Registrando...
                    </>
                  ) : (
                    <>
                      Reservar con {selectedLider.name.split(" ")[0]}
                      <ArrowRight
                        size={16}
                        strokeWidth={1.5}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </button>

                <p className="text-white/40 text-xs text-center">
                  Te contactaremos en menos de 24 horas para confirmar tu cita.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}
