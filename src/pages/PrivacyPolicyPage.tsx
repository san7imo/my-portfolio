import { Link } from "react-router-dom";
import { useEffect, type ReactNode } from "react";
import { usePageMetadata } from "../hooks/usePageMetadata";

const seoTitle = "Política de Tratamiento de Datos Personales | Asistente de documentos públicos";
const seoDescription =
  "Política de privacidad y tratamiento de datos personales aplicable al Asistente de documentos públicos, herramienta de orientación por WhatsApp en Colombia.";

const placeholders = [
  "[NOMBRE DEL RESPONSABLE]",
  "[NIT O IDENTIFICACIÓN]",
  "[CORREO DE CONTACTO]",
  "[DIRECCIÓN FÍSICA, SI APLICA]",
  "[CIUDAD]",
  "[PAÍS]",
  "[FECHA DE VIGENCIA]",
  "[ENLACE A CANAL DE PETICIONES]",
  "[DOMINIO DEL SITIO]",
  "[NOMBRE DEL PROYECTO]",
];

const tableOfContents = [
  { id: "responsable", label: "Responsable del tratamiento" },
  { id: "finalidad", label: "Finalidad del tratamiento" },
  { id: "datos-recolectados", label: "Datos personales recolectados" },
  { id: "datos-sensibles", label: "Datos sensibles" },
  { id: "autorizacion", label: "Autorización del usuario" },
  { id: "proveedores", label: "Uso de proveedores tecnológicos" },
  { id: "conservacion", label: "Conservación de la información" },
  { id: "derechos", label: "Derechos del titular" },
  { id: "consultas", label: "Consultas y reclamos" },
  { id: "seguridad", label: "Seguridad de la información" },
  { id: "limitaciones", label: "Limitaciones del asistente" },
  { id: "menores", label: "Información de menores de edad" },
  { id: "transferencia", label: "Transferencia o transmisión" },
  { id: "cambios", label: "Cambios en la política" },
  { id: "aceptacion", label: "Aceptación" },
];

const cardClassName =
  "rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-[0_20px_80px_rgba(2,6,23,0.35)] backdrop-blur";

const sectionClassName =
  "scroll-mt-6 rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-[0_20px_80px_rgba(2,6,23,0.28)]";

function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={sectionClassName}>
      <div className="mb-5 flex items-center gap-4">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 font-mono text-sm text-cyan-200">
          {number}
        </span>
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-200 sm:text-base">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-slate-200">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-cyan-300" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPolicyPage() {
  usePageMetadata({
    title: seoTitle,
    description: seoDescription,
    robots: "noindex, nofollow",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020817] text-white">
      {/* Revisar jurídicamente antes de cambiar la página a indexable o reemplazar placeholders. */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_60%)]" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl" />
      </div>

      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <header className={`${cardClassName} overflow-hidden`}>
          <div className="mb-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-slate-300">
            <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1">Documento de trabajo</span>
            <span className="rounded-full border border-white/10 px-3 py-1">Última actualización: [FECHA DE VIGENCIA]</span>
            <span className="rounded-full border border-white/10 px-3 py-1">Dominio de referencia: [DOMINIO DEL SITIO]</span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.45fr_0.95fr]">
            <div className="space-y-5 text-left">
              <p className="font-mono text-sm uppercase tracking-[0.28em] text-cyan-200">
                Aplicable al Asistente de documentos públicos
              </p>
              <h1 className="galactic-font max-w-3xl text-3xl leading-tight text-white sm:text-5xl">
                Política de Tratamiento de Datos Personales y Privacidad
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
                Esta política explica cómo recolectamos, usamos, almacenamos y protegemos la información que
                los usuarios comparten al interactuar con el Asistente de documentos públicos por WhatsApp u
                otros canales habilitados.
              </p>
              <p className="max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                Este texto toma como referencia general la Ley 1581 de 2012, el Decreto 1377 de 2013 y las
                normas que los modifiquen, sustituyan o reglamenten. No constituye una garantía de
                cumplimiento legal absoluto y debe ser validado por el responsable jurídico del proyecto antes
                de su publicación final.
              </p>
            </div>

            <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/80 p-5">
              <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-left">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-amber-100">Advertencia legal</p>
                <p className="mt-3 text-sm leading-7 text-amber-50">
                  Antes de publicar esta política como versión definitiva, complete todos los campos en
                  corchetes y solicite revisión formal de un abogado o responsable jurídico.
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-left">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-100">Recomendación de privacidad</p>
                <p className="mt-3 text-sm leading-7 text-cyan-50">
                  Evite enviar contraseñas, códigos de verificación, datos bancarios completos o información de
                  terceros que no sea necesaria para entender el documento.
                </p>
              </div>

              <div className="mt-auto flex flex-wrap gap-3 pt-2">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.08] px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
                >
                  Volver al inicio del portafolio
                </Link>
                <a
                  href="mailto:[CORREO DE CONTACTO]"
                  className="inline-flex items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/[0.12] px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/20"
                >
                  Contactar por correo
                </a>
              </div>
            </div>
          </div>
        </header>

        <section className={cardClassName}>
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-300">Índice</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Contenido de esta política</h2>
            </div>
            <a
              href="#aceptacion"
              className="hidden rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:text-white sm:inline-flex"
            >
              Ir a la aceptación
            </a>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {tableOfContents.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:bg-slate-900 hover:text-white"
              >
                <span className="mr-2 font-mono text-cyan-200">{String(index + 1).padStart(2, "0")}.</span>
                {item.label}
              </a>
            ))}
          </div>
        </section>

        <Section id="responsable" number="01" title="Responsable del tratamiento">
          <p>
            El responsable del tratamiento de los datos personales recolectados a través del Asistente de
            documentos públicos será la persona natural o jurídica que determine los fines y medios del
            tratamiento.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <p className="font-semibold text-white">Responsable</p>
              <p className="mt-2 text-slate-300">[NOMBRE DEL RESPONSABLE]</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <p className="font-semibold text-white">Identificación o NIT</p>
              <p className="mt-2 text-slate-300">[NIT O IDENTIFICACIÓN]</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <p className="font-semibold text-white">Correo de contacto</p>
              <p className="mt-2 text-slate-300">[CORREO DE CONTACTO]</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <p className="font-semibold text-white">Dirección</p>
              <p className="mt-2 text-slate-300">[DIRECCIÓN FÍSICA, SI APLICA]</p>
            </div>
          </div>
          <p>
            Ciudad y país de referencia: <strong className="text-white">[CIUDAD], Colombia</strong>. Si la
            operación o administración del proyecto involucra otro país, deberá completarse también el campo{" "}
            <strong className="text-white">[PAÍS]</strong> antes de la publicación final.
          </p>
        </Section>

        <Section id="finalidad" number="02" title="Finalidad del tratamiento">
          <p>
            Los datos personales serán tratados únicamente para finalidades legítimas, informadas al titular y
            relacionadas con la operación del asistente, dentro del marco de los principios de finalidad,
            libertad, transparencia, seguridad, acceso y circulación restringida.
          </p>
          <BulletList
            items={[
              "Recibir mensajes enviados por el usuario a través de WhatsApp u otros canales habilitados.",
              "Analizar documentos, imágenes, audios o archivos PDF enviados por el usuario para facilitar su comprensión.",
              "Generar explicaciones en lenguaje sencillo sobre documentos públicos, legales, administrativos u oficiales.",
              "Orientar al usuario sobre posibles pasos generales, rutas institucionales o entidades de apoyo, sin sustituir asesoría profesional.",
              "Mejorar el funcionamiento, precisión, continuidad y experiencia de uso del asistente.",
              "Registrar interacciones necesarias para soporte, seguridad, auditoría, trazabilidad o mejora del servicio.",
              "Detectar situaciones urgentes o sensibles que puedan requerir orientación hacia ayuda humana o entidades competentes.",
              "Atender obligaciones legales, regulatorias, contractuales o requerimientos de autoridades competentes, si aplica.",
            ]}
          />
          <p>
            El asistente es una herramienta de apoyo informativo. <strong className="text-white">No reemplaza
            asesoría jurídica profesional</strong>, no actúa como apoderado ni define la estrategia legal del
            usuario.
          </p>
        </Section>

        <Section id="datos-recolectados" number="03" title="Datos personales que pueden ser recolectados">
          <p>
            Dependiendo de la interacción, podremos tratar datos personales suministrados directamente por el
            usuario o contenidos en los archivos que este comparta.
          </p>
          <BulletList
            items={[
              "Nombre o identificador del usuario, si aparece en la conversación o en el documento.",
              "Número de WhatsApp asociado a la interacción.",
              "Mensajes enviados por el usuario.",
              "Audios y sus transcripciones.",
              "Imágenes enviadas por el usuario.",
              "PDFs, fotografías de documentos y otros archivos compartidos.",
              "Información contenida dentro de documentos oficiales, respuestas de entidades, citaciones, trámites, solicitudes, quejas o comunicaciones.",
              "Fechas, entidades, radicados u otros datos visibles en los documentos.",
              "Datos necesarios para la trazabilidad del servicio y la atención de solicitudes.",
              "Metadatos técnicos mínimos, si aplica, como fecha, hora, canal o identificadores operativos.",
            ]}
          />
        </Section>

        <Section id="datos-sensibles" number="04" title="Datos sensibles">
          <p>
            Algunos documentos enviados por los usuarios pueden contener datos sensibles o información de
            especial protección, por ejemplo:
          </p>
          <BulletList
            items={[
              "Información de salud.",
              "Datos de menores de edad.",
              "Información familiar.",
              "Información económica.",
              "Datos relacionados con procesos judiciales o administrativos.",
              "Direcciones o ubicaciones.",
              "Números de identificación.",
              "Información sobre violencia, amenazas o situaciones de riesgo.",
            ]}
          />
          <div className="rounded-2xl border border-rose-300/25 bg-rose-300/10 p-4">
            <p className="text-sm leading-7 text-rose-50">
              El usuario no está obligado a enviar datos sensibles. Recomendamos ocultar o tapar información
              que no sea necesaria, como número completo de cédula, dirección exacta, datos bancarios, claves,
              códigos de verificación o información de terceros.
            </p>
          </div>
        </Section>

        <Section id="autorizacion" number="05" title="Autorización del usuario">
          <p>
            Antes de usar el asistente, el usuario debe contar con información clara sobre esta política y la
            finalidad del tratamiento. La autorización debe ser previa, expresa e informada.
          </p>
          <p>
            Al seleccionar <strong className="text-white">“Acepto”</strong>, continuar la conversación o enviar
            mensajes, audios, imágenes, documentos o archivos por los canales habilitados, el usuario autoriza
            el tratamiento de sus datos para las finalidades descritas en esta política.
          </p>
          <p>
            Si el usuario no acepta esta política, el asistente no podrá analizar mensajes, audios, imágenes o
            documentos, ni prestar la orientación automatizada solicitada.
          </p>
        </Section>

        <Section id="proveedores" number="06" title="Uso de proveedores tecnológicos">
          <p>
            Para prestar el servicio podremos apoyarnos en herramientas tecnológicas externas que intervienen en
            la recepción, procesamiento, automatización, almacenamiento o gestión operativa del asistente.
          </p>
          <BulletList
            items={[
              "ReplyAgent para la operación del bot y la gestión conversacional por WhatsApp.",
              "Gemini / Google para capacidades de procesamiento y análisis asistido por inteligencia artificial.",
              "Make para automatizaciones e integraciones, si aplica.",
              "Meta / WhatsApp Business para la mensajería y el canal de interacción, si aplica.",
              "Google Sheets, Airtable, Supabase u otras herramientas de registro o almacenamiento, si aplica.",
              "Correo operativo del proyecto y servicios auxiliares estrictamente necesarios para la atención del usuario.",
            ]}
          />
          <p>
            Estos proveedores podrán procesar información únicamente en la medida necesaria para apoyar la
            prestación del servicio, sujeto a sus propios términos y a las decisiones de configuración que adopte{" "}
            <strong className="text-white">[NOMBRE DEL RESPONSABLE]</strong>. Esta política no afirma
            certificaciones, garantías especiales ni niveles de seguridad no verificados de manera independiente.
          </p>
        </Section>

        <Section id="conservacion" number="07" title="Conservación de la información">
          <p>
            La información será conservada solo durante el tiempo razonablemente necesario para prestar el
            servicio, atender solicitudes, mejorar el funcionamiento del asistente, cumplir obligaciones legales
            o resolver incidentes operativos o de seguridad.
          </p>
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <p className="text-slate-200">
              El tiempo específico de conservación será definido por{" "}
              <strong className="text-white">[NOMBRE DEL RESPONSABLE]</strong> según la finalidad del
              tratamiento y las obligaciones aplicables.
            </p>
          </div>
          <BulletList
            items={[
              "No conservar documentos más tiempo del necesario.",
              "Eliminar archivos sensibles cuando ya no sean requeridos para la finalidad informada.",
              "Limitar el acceso a la información únicamente a personas autorizadas.",
            ]}
          />
        </Section>

        <Section id="derechos" number="08" title="Derechos del titular">
          <p>
            El titular de los datos personales podrá ejercer, cuando sea procedente, los derechos reconocidos
            por la normativa aplicable.
          </p>
          <BulletList
            items={[
              "Conocer los datos personales que estén siendo tratados.",
              "Actualizarlos y rectificarlos cuando sean parciales, inexactos, incompletos o induzcan a error.",
              "Solicitar prueba de la autorización otorgada.",
              "Solicitar información sobre el uso dado a sus datos.",
              "Presentar consultas o reclamos.",
              "Solicitar la supresión de datos cuando sea procedente.",
              "Revocar la autorización cuando sea procedente y no exista deber legal o contractual que lo impida.",
            ]}
          />
        </Section>

        <Section id="consultas" number="09" title="Canal para consultas y reclamos">
          <p>
            Las consultas, solicitudes o reclamos relacionados con datos personales podrán presentarse a través
            de los siguientes canales:
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <p className="font-semibold text-white">Correo</p>
              <p className="mt-2 text-slate-300">[CORREO DE CONTACTO]</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <p className="font-semibold text-white">Asunto sugerido</p>
              <p className="mt-2 text-slate-300">Solicitud de datos personales</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 md:col-span-2">
              <p className="font-semibold text-white">Canal adicional, si aplica</p>
              <p className="mt-2 text-slate-300">[ENLACE A CANAL DE PETICIONES]</p>
            </div>
          </div>
          <p>
            Las solicitudes serán atendidas dentro de los tiempos previstos en la normativa aplicable. Para
            tramitarlas, el usuario deberá identificarse de forma razonable y aportar la información mínima
            necesaria para ubicar la interacción o el documento relacionado.
          </p>
        </Section>

        <Section id="seguridad" number="10" title="Seguridad de la información">
          <p>
            Se aplicarán medidas razonables de carácter técnico, humano y administrativo para proteger la
            información frente a acceso no autorizado, pérdida, uso indebido, alteración o divulgación no
            permitida.
          </p>
          <BulletList
            items={[
              "Control de accesos y uso limitado de credenciales.",
              "Restricción del acceso a personal autorizado.",
              "Revisión periódica de integraciones y flujos automatizados.",
              "Protección de API keys, credenciales y configuraciones operativas.",
              "Evitar el almacenamiento innecesario de documentos o datos personales.",
              "Eliminación de información que ya no sea requerida para la finalidad informada.",
              "Recomendación constante a los usuarios de no enviar claves, contraseñas, datos bancarios o códigos de verificación.",
            ]}
          />
        </Section>

        <Section id="limitaciones" number="11" title="Limitaciones del asistente">
          <BulletList
            items={[
              "El asistente no es abogado ni presta representación legal.",
              "No reemplaza asesoría jurídica profesional.",
              "No garantiza resultados, decisiones favorables ni respuestas oficiales de entidades.",
              "No toma decisiones legales por el usuario.",
              "No debe usarse para emergencias o situaciones que requieran atención inmediata.",
            ]}
          />
          <p>
            En casos urgentes o de riesgo, el usuario debe contactar a las autoridades o entidades competentes,
            como Personería, Defensoría del Pueblo, Comisaría de Familia, Fiscalía, servicios de emergencia o la
            entidad correspondiente según el caso.
          </p>
        </Section>

        <Section id="menores" number="12" title="Tratamiento de información de menores de edad">
          <p>
            El tratamiento de información relacionada con menores de edad debe realizarse con especial cuidado,
            respetando su interés superior y sus derechos fundamentales.
          </p>
          <p>
            No se debe enviar información de menores salvo que sea estrictamente necesaria para la orientación
            solicitada y exista una razón legítima para compartirla. En caso de riesgo para menores, se
            recomienda acudir a ICBF, Comisaría de Familia, Defensoría del Pueblo u otra autoridad competente.
          </p>
        </Section>

        <Section id="transferencia" number="13" title="Transferencia o transmisión de datos">
          <p>
            Podremos transmitir o permitir el procesamiento de datos por proveedores tecnológicos que apoyan la
            operación del asistente, siempre en función de las finalidades descritas en esta política.
          </p>
          <p>
            Cuando exista acceso o tratamiento por terceros, este se limitará a lo necesario para la operación,
            soporte, automatización, almacenamiento o mejora del servicio, según la arquitectura técnica definida
            por <strong className="text-white">[NOMBRE DEL RESPONSABLE]</strong>.
          </p>
        </Section>

        <Section id="cambios" number="14" title="Cambios en la política">
          <p>
            Esta política podrá ser actualizada cuando cambien las características del servicio, las herramientas
            tecnológicas utilizadas, las finalidades del tratamiento o las obligaciones legales aplicables.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <p className="font-semibold text-white">Fecha de vigencia</p>
              <p className="mt-2 text-slate-300">[FECHA DE VIGENCIA]</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <p className="font-semibold text-white">Última actualización</p>
              <p className="mt-2 text-slate-300">[FECHA DE VIGENCIA]</p>
            </div>
          </div>
          <p>Se recomienda revisar esta política periódicamente antes de usar el servicio o enviar nuevos documentos.</p>
        </Section>

        <Section id="aceptacion" number="15" title="Aceptación">
          <p>
            Al usar el Asistente de documentos públicos, aceptar la política o enviar información por los canales
            habilitados, el usuario manifiesta haber leído y aceptado esta política de tratamiento de datos
            personales y privacidad.
          </p>
        </Section>

        <section className={cardClassName}>
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-300">Pendientes</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Campos por completar antes de publicar</h2>
            </div>
            <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-amber-100">
              Revisión final requerida
            </span>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {placeholders.map((placeholder) => (
              <div key={placeholder} className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 font-mono text-sm text-slate-200">
                {placeholder}
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-300">
            Si el nombre comercial definitivo difiere del actual, actualice también{" "}
            <strong className="text-white">[NOMBRE DEL PROYECTO]</strong> en todos los puntos de contacto,
            formularios, flujos de autorización y mensajes automáticos.
          </p>
        </section>
      </main>
    </div>
  );
}
