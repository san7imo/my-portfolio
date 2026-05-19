import { Link } from "react-router-dom";
import { useEffect, type ReactNode } from "react";
import { usePageMetadata } from "../hooks/usePageMetadata";

const seoTitle = "Política de Tratamiento de Datos Personales | Asistente de documentos públicos";
const seoDescription =
  "Política de privacidad y tratamiento de datos personales aplicable al Asistente de documentos públicos, herramienta de orientación por WhatsApp en Colombia.";

const tableOfContents = [
  { id: "proyecto", label: "Identificación del proyecto" },
  { id: "responsable", label: "Responsable del tratamiento" },
  { id: "beneficiaria", label: "Organización beneficiaria" },
  { id: "enlace", label: "Responsable interno / enlace" },
  { id: "encargado", label: "Encargado / proveedor tecnológico" },
  { id: "canal", label: "Canal de atención y publicación" },
  { id: "vigencia", label: "Vigencia del proyecto" },
  { id: "finalidad", label: "Finalidades del tratamiento" },
  { id: "datos", label: "Datos personales tratados" },
  { id: "sensibles", label: "Datos sensibles" },
  { id: "autorizacion", label: "Autorización del usuario" },
  { id: "proveedores", label: "Uso de proveedores tecnológicos" },
  { id: "conservacion", label: "Conservación de la información" },
  { id: "confidencialidad", label: "Confidencialidad" },
  { id: "derechos", label: "Derechos del titular" },
  { id: "consultas", label: "Consultas y reclamos" },
  { id: "seguridad", label: "Seguridad de la información" },
  { id: "limitaciones", label: "Limitaciones del asistente" },
  { id: "menores", label: "Información de menores de edad" },
  { id: "transmision", label: "Procesamiento por terceros" },
  { id: "visibilidad", label: "Visibilidad institucional" },
  { id: "cambios", label: "Cambios en la política" },
  { id: "aceptacion", label: "Aceptación" },
  { id: "revision", label: "Nota de revisión jurídica" },
];

const cardClassName =
  "rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-[0_20px_80px_rgba(2,6,23,0.35)] backdrop-blur";

const sectionClassName =
  "scroll-mt-6 rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-[0_20px_80px_rgba(2,6,23,0.28)]";

const pendingPlaceholders = [
  "[Nombre de la organización beneficiaria]",
  "[CORREO OFICIAL PARA DATOS PERSONALES]",
  "[FECHA DE ÚLTIMA ACTUALIZACIÓN]",
];

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

function InfoCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
      <p className="font-semibold text-white">{title}</p>
      <div className="mt-2 space-y-2 text-slate-300">{children}</div>
    </div>
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
      {/* Documento base sujeto a revisión jurídica y administrativa antes de publicación definitiva. */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_60%)]" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl" />
      </div>

      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <header className={`${cardClassName} overflow-hidden`}>
          <div className="mb-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-slate-300">
            <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1">Documento base de revisión</span>
            <span className="rounded-full border border-white/10 px-3 py-1">Canal principal: WhatsApp</span>
            <span className="rounded-full border border-white/10 px-3 py-1">Última actualización: [FECHA DE ÚLTIMA ACTUALIZACIÓN]</span>
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
                Esta política explica cómo se recolecta, usa, almacena y protege la información que los usuarios
                comparten al interactuar con el Asistente de documentos públicos a través de WhatsApp u otros
                canales habilitados.
              </p>
              <p className="max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                Este documento toma como referencia general la Ley 1581 de 2012, el Decreto 1377 de 2013 y las
                normas que los modifiquen, sustituyan o reglamenten. No afirma cumplimiento legal absoluto.
              </p>
            </div>

            <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/80 p-5">
              <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-left">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-amber-100">Nota de revisión jurídica</p>
                <p className="mt-3 text-sm leading-7 text-amber-50">
                  El contenido de esta política debe ser revisado y validado por el responsable jurídico o
                  administrativo de la entidad contratante, la organización beneficiaria o quien corresponda
                  antes de su publicación definitiva.
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-left">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-100">Recomendación de privacidad</p>
                <p className="mt-3 text-sm leading-7 text-cyan-50">
                  Evite enviar contraseñas, datos bancarios completos, códigos de verificación o información de
                  terceros que no sea necesaria para entender el documento consultado.
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
                  href="#consultas"
                  className="inline-flex items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/[0.12] px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/20"
                >
                  Ver canal de contacto
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
              href="#revision"
              className="hidden rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:text-white sm:inline-flex"
            >
              Ir a la nota final
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

        <Section id="proyecto" number="01" title="Identificación del proyecto">
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard title="Nombre del proyecto">
              <p>Asistente de documentos públicos - WhatsApp</p>
            </InfoCard>
            <InfoCard title="Canal principal">
              <p>WhatsApp</p>
            </InfoCard>
            <InfoCard title="Marco del proyecto">
              <p>
                Proyecto desarrollado en el marco del Fondo DemocráTICa, administrado por WINGU y financiado por
                CIVICUS y donantes internacionales.
              </p>
            </InfoCard>
            <InfoCard title="Finalidad general">
              <p>
                Orientar a usuarios en Colombia mediante la explicación sencilla de documentos, mensajes, audios,
                imágenes, PDFs o trámites relacionados con entidades públicas, procesos administrativos o temas
                legales.
              </p>
            </InfoCard>
          </div>
        </Section>

        <Section id="responsable" number="02" title="Responsable del tratamiento">
          <p>
            Para efectos de esta política, la entidad contratante en Colombia será la Fundación Casa Cívica
            Colombia, en el marco del Fondo DemocráTICa.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard title="Entidad contratante en Colombia">
              <p>Fundación Casa Cívica Colombia</p>
              <p>NIT: 901273673-6</p>
            </InfoCard>
            <InfoCard title="Domicilio">
              <p>
                Carrera 7 # 156-10, Centro Empresarial North Point, Torre Krystal, Piso 17, oficina 1707,
                Bogotá, Colombia
              </p>
            </InfoCard>
          </div>
          <p>
            La Fundación Casa Cívica Colombia actúa como entidad contratante en Colombia dentro del marco del
            Fondo DemocráTICa. En la medida en que defina o participe en la definición de las finalidades,
            alcance y condiciones generales del proyecto, podrá actuar como Responsable del Tratamiento de los
            datos personales tratados en el marco del Asistente de documentos públicos.
          </p>
        </Section>

        <Section id="beneficiaria" number="03" title="Organización beneficiaria">
          <p>
            La organización beneficiaria es la entidad, iniciativa o proyecto receptor del servicio, encargada
            de acompañar la ejecución funcional del proyecto y validar técnicamente los entregables.
          </p>
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <p className="font-semibold text-white">Organización beneficiaria</p>
            <p className="mt-2 text-slate-300">[Nombre de la organización beneficiaria]</p>
          </div>
          <p>
            La organización beneficiaria podrá participar en la definición funcional del asistente, la validación
            de entregables y el seguimiento de la operación, según lo establecido en el contrato y en los
            acuerdos que rijan la ejecución del proyecto.
          </p>
        </Section>

        <Section id="enlace" number="04" title="Responsable interno / enlace del proyecto">
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard title="Responsable interno / enlace">
              <p>Saúl Alveiro Amaya Suárez</p>
              <p>C.C. 1143139283</p>
            </InfoCard>
            <InfoCard title="Rol operativo">
              <p>
                Participa en la comunicación, coordinación y seguimiento del proyecto con el proveedor
                tecnológico y/o la organización beneficiaria.
              </p>
            </InfoCard>
          </div>
          <p>
            Para efectos operativos y de coordinación del proyecto, se identifica como responsable interno o
            enlace de coordinación a Saúl Alveiro Amaya Suárez, quien participa en la comunicación, coordinación
            y seguimiento del proyecto con el proveedor tecnológico y/o la organización beneficiaria.
          </p>
          <p>
            La identificación del responsable interno o enlace del proyecto no reemplaza ni modifica las
            obligaciones que correspondan a la entidad responsable del tratamiento, a la organización
            beneficiaria o al proveedor tecnológico, según el rol que cada parte asuma conforme a la normativa
            aplicable y los acuerdos contractuales.
          </p>
        </Section>

        <Section id="encargado" number="05" title="Encargado del tratamiento / proveedor tecnológico">
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard title="Proveedor tecnológico">
              <p>Santiago Londoño Morales</p>
              <p>C.C. 1152704699</p>
              <p>San7imo</p>
              <p>Medellín, Colombia</p>
            </InfoCard>
            <InfoCard title="Alcance técnico">
              <p>
                Configuración, operación, automatización, integración, mantenimiento y soporte del asistente.
              </p>
            </InfoCard>
          </div>
          <p>
            Santiago Londoño Morales / San7imo actuará como proveedor tecnológico y Encargado del Tratamiento,
            realizando actividades técnicas necesarias para la configuración, operación, automatización,
            integración, mantenimiento y soporte del asistente.
          </p>
          <p>
            El proveedor tecnológico tratará los datos personales únicamente para las finalidades autorizadas,
            conforme a las instrucciones de la entidad responsable, la organización beneficiaria y los acuerdos
            contractuales correspondientes.
          </p>
        </Section>

        <Section id="canal" number="06" title="Canal de atención y publicación de la política">
          <p>
            El canal principal de atención del Asistente de documentos públicos es WhatsApp. Esta política se
            publica en el portafolio del proveedor tecnológico como página informativa de acceso público, para
            que los usuarios puedan consultar cómo se recolecta, usa y protege la información enviada al
            asistente.
          </p>
        </Section>

        <Section id="vigencia" number="07" title="Vigencia del proyecto">
          <p>
            La vigencia contractual inicial del proyecto será del <strong className="text-white">27 de abril de
            2026</strong> al <strong className="text-white">5 de junio de 2026</strong>.
          </p>
          <p>
            Algunos entregables, validaciones, ajustes o cierres podrán extenderse hasta el{" "}
            <strong className="text-white">12 de junio de 2026</strong>, conforme a las condiciones
            particulares de contratación y los acuerdos entre las partes.
          </p>
          <p>
            La operación del asistente podrá ampliarse, suspenderse o finalizarse según los resultados del
            proyecto, las necesidades de operación, las condiciones contractuales, las instrucciones de la
            entidad contratante, la organización beneficiaria o las decisiones del responsable del tratamiento.
          </p>
        </Section>

        <Section id="finalidad" number="08" title="Finalidades del tratamiento">
          <p>
            Los datos personales serán tratados para finalidades legítimas, informadas al usuario y relacionadas
            con la operación del asistente, dentro del marco de los principios de finalidad, libertad,
            transparencia, seguridad, acceso y circulación restringida.
          </p>
          <BulletList
            items={[
              "Recibir mensajes enviados por el usuario.",
              "Analizar documentos, imágenes, audios, PDFs o archivos enviados por WhatsApp.",
              "Generar explicaciones en lenguaje sencillo.",
              "Orientar al usuario sobre posibles pasos generales o entidades de apoyo.",
              "Mejorar el funcionamiento del asistente.",
              "Registrar interacciones necesarias para soporte, seguridad, auditoría o mejora del servicio.",
              "Detectar casos urgentes o sensibles que puedan requerir orientación hacia ayuda humana o entidades competentes.",
              "Cumplir obligaciones legales, contractuales, administrativas, de auditoría o de seguimiento del proyecto.",
            ]}
          />
          <p>
            El asistente no reemplaza a un abogado ni presta asesoría jurídica personalizada.
          </p>
        </Section>

        <Section id="datos" number="09" title="Datos personales que pueden ser tratados">
          <p>
            Dependiendo de la interacción, podrán tratarse datos personales suministrados directamente por el
            usuario o contenidos en los archivos compartidos con el asistente.
          </p>
          <BulletList
            items={[
              "Nombre o identificador del usuario, si aparece.",
              "Número de WhatsApp.",
              "Mensajes enviados por el usuario.",
              "Audios y transcripciones.",
              "Imágenes.",
              "PDFs y documentos.",
              "Información visible dentro de los documentos.",
              "Fechas, entidades, radicados o referencias visibles.",
              "Información necesaria para la trazabilidad del servicio.",
              "Metadatos técnicos mínimos, si aplica.",
            ]}
          />
        </Section>

        <Section id="sensibles" number="10" title="Datos sensibles">
          <p>
            Algunos documentos enviados por los usuarios pueden contener datos sensibles o información de
            especial protección, como por ejemplo:
          </p>
          <BulletList
            items={[
              "Datos de salud.",
              "Datos de menores de edad.",
              "Información familiar.",
              "Información económica.",
              "Direcciones.",
              "Números de identificación.",
              "Información sobre procesos judiciales o administrativos.",
              "Información sobre violencia, amenazas o situaciones de riesgo.",
            ]}
          />
          <div className="rounded-2xl border border-rose-300/25 bg-rose-300/10 p-4">
            <p className="text-sm leading-7 text-rose-50">
              El usuario no está obligado a enviar datos sensibles. Se recomienda ocultar o tapar información
              que no sea necesaria, como número completo de cédula, dirección exacta, datos bancarios, claves,
              códigos de verificación o información de terceros.
            </p>
          </div>
        </Section>

        <Section id="autorizacion" number="11" title="Autorización del usuario">
          <p>
            Antes de usar el asistente, el usuario debe aceptar la política de tratamiento de datos.
          </p>
          <p>
            Al seleccionar <strong className="text-white">“Acepto”</strong>, continuar la conversación o enviar
            documentos, mensajes, audios, imágenes, PDFs o archivos por los canales habilitados, el usuario
            autoriza el tratamiento de sus datos para las finalidades descritas en esta política.
          </p>
          <p>
            Si el usuario no acepta esta política, el asistente no podrá analizar mensajes, audios, imágenes,
            PDFs o documentos.
          </p>
        </Section>

        <Section id="proveedores" number="12" title="Uso de proveedores tecnológicos">
          <p>
            Para prestar el servicio se podrán usar herramientas y plataformas tecnológicas externas que apoyan
            la recepción, procesamiento, automatización, almacenamiento o registro de la información.
          </p>
          <BulletList
            items={[
              "ReplyAgent.",
              "Gemini / Google.",
              "Make.",
              "LLM Whisperer, si aplica.",
              "Meta / WhatsApp Business.",
              "Google Sheets, Airtable, Supabase, Google Drive u otras herramientas de almacenamiento o registro, si aplica.",
            ]}
          />
          <p>
            Estas plataformas pueden procesar datos únicamente en la medida necesaria para operar el servicio.
            Esta política no afirma certificaciones, garantías o condiciones técnicas no verificadas de manera
            independiente.
          </p>
        </Section>

        <Section id="conservacion" number="13" title="Conservación de la información">
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard title="A. Información enviada por usuarios finales">
              <p>
                La información enviada por usuarios a través de WhatsApp será conservada solo durante el tiempo
                necesario para prestar el servicio, generar la orientación solicitada, atender solicitudes,
                realizar soporte, mejorar el asistente o cumplir obligaciones legales o contractuales
                aplicables.
              </p>
            </InfoCard>
            <InfoCard title="B. Documentación administrativa, técnica, contractual o de auditoría">
              <p>
                La documentación relacionada con la ejecución del contrato, entregables, evidencias técnicas,
                reportes, facturas, soportes y documentación de auditoría podrá conservarse durante el tiempo
                exigido por el contrato, por WINGU, CIVICUS, donantes, auditores o por la normativa aplicable.
              </p>
            </InfoCard>
          </div>
          <p>
            En todos los casos se aplicará un criterio de minimización de datos y de conservación solo por el
            tiempo necesario según la finalidad correspondiente.
          </p>
        </Section>

        <Section id="confidencialidad" number="14" title="Confidencialidad">
          <p>
            El proveedor tecnológico deberá mantener reserva sobre la información no pública, técnica,
            financiera, estratégica o personal a la que tenga acceso durante la ejecución del proyecto. Esta
            información no podrá ser usada para fines distintos a la prestación, operación, soporte, mejora,
            auditoría o cumplimiento de obligaciones relacionadas con el proyecto.
          </p>
          <p>
            La obligación de confidencialidad se mantendrá incluso después de finalizada la ejecución del
            proyecto, conforme a los acuerdos contractuales aplicables.
          </p>
        </Section>

        <Section id="derechos" number="15" title="Derechos del titular">
          <p>
            El usuario podrá ejercer, cuando sea procedente, los derechos reconocidos por la normativa
            aplicable.
          </p>
          <BulletList
            items={[
              "Conocer sus datos.",
              "Actualizarlos.",
              "Rectificarlos.",
              "Solicitar prueba de autorización.",
              "Solicitar información sobre el uso dado a sus datos.",
              "Presentar consultas o reclamos.",
              "Solicitar eliminación cuando sea procedente.",
              "Revocar la autorización cuando sea procedente.",
            ]}
          />
        </Section>

        <Section id="consultas" number="16" title="Canal para consultas y reclamos">
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard title="Correo de contacto para datos personales">
              <p>[CORREO OFICIAL PARA DATOS PERSONALES]</p>
            </InfoCard>
            <InfoCard title="Asunto sugerido">
              <p>Solicitud de datos personales - Asistente de documentos públicos</p>
            </InfoCard>
            <InfoCard title="Canal principal del servicio">
              <p>WhatsApp</p>
            </InfoCard>
            <InfoCard title="Correo de notificaciones del Fondo DemocráTICa">
              <p>fondo@democratica.digital</p>
              <p className="text-xs text-slate-400">
                Este correo no debe asumirse como canal principal de datos personales salvo confirmación expresa
                de la entidad correspondiente.
              </p>
            </InfoCard>
          </div>
          <p>
            El usuario deberá identificarse de forma razonable para tramitar su solicitud y aportar la
            información mínima necesaria para ubicar la interacción o el documento relacionado.
          </p>
        </Section>

        <Section id="seguridad" number="17" title="Seguridad de la información">
          <p>
            Se aplicarán medidas razonables de carácter técnico, humano y administrativo para proteger la
            información frente a accesos no autorizados, pérdida, uso indebido, alteración o divulgación no
            permitida.
          </p>
          <BulletList
            items={[
              "Control de accesos.",
              "Acceso limitado a personal autorizado.",
              "Protección de credenciales.",
              "Restricción del uso de API keys.",
              "Revisión de integraciones.",
              "Evitar almacenamiento innecesario.",
              "Eliminación de información no requerida.",
              "Recomendación de no enviar claves, datos bancarios ni códigos de verificación.",
            ]}
          />
        </Section>

        <Section id="limitaciones" number="18" title="Limitaciones del asistente">
          <BulletList
            items={[
              "El asistente no es abogado.",
              "No reemplaza asesoría jurídica profesional.",
              "No garantiza resultados.",
              "No toma decisiones legales por el usuario.",
              "No debe usarse como único canal en emergencias.",
            ]}
          />
          <p>
            En casos urgentes, el usuario debe acudir a autoridades, Personería, Defensoría del Pueblo,
            Comisaría de Familia, Fiscalía, servicios de emergencia o la entidad competente.
          </p>
        </Section>

        <Section id="menores" number="19" title="Tratamiento de información de menores de edad">
          <p>
            La información de menores de edad debe manejarse con especial cuidado.
          </p>
          <p>
            No se debe enviar información de menores salvo que sea estrictamente necesaria para la orientación
            solicitada. Cuando exista riesgo para menores, se recomienda acudir a ICBF, Comisaría de Familia,
            Defensoría del Pueblo o la autoridad competente.
          </p>
        </Section>

        <Section id="transmision" number="20" title="Transmisión o procesamiento por terceros">
          <p>
            Podremos transmitir o permitir el procesamiento de datos por proveedores tecnológicos que apoyan la
            operación del asistente, siempre en función de las finalidades descritas en esta política.
          </p>
        </Section>

        <Section id="visibilidad" number="21" title="Visibilidad institucional">
          <p>
            El proyecto se desarrolla en el marco del Fondo DemocráTICa. Las menciones, logos o referencias a
            WINGU, CIVICUS, donantes internacionales, la Unión Europea u otras entidades aliadas se utilizarán
            únicamente conforme a las instrucciones de visibilidad institucional aplicables al proyecto.
          </p>
        </Section>

        <Section id="cambios" number="22" title="Cambios en la política">
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard title="Fecha de entrada en vigencia">
              <p>27 de abril de 2026</p>
            </InfoCard>
            <InfoCard title="Vigencia contractual inicial">
              <p>Hasta el 5 de junio de 2026</p>
            </InfoCard>
            <InfoCard title="Fecha estimada de cierre o entrega final de productos">
              <p>12 de junio de 2026</p>
            </InfoCard>
            <InfoCard title="Última actualización">
              <p>[FECHA DE ÚLTIMA ACTUALIZACIÓN]</p>
            </InfoCard>
          </div>
          <p>
            La política podrá actualizarse según cambios en el proyecto, las herramientas utilizadas, los
            responsables, la operación o la normativa aplicable.
          </p>
        </Section>

        <Section id="aceptacion" number="23" title="Aceptación">
          <p>
            Al usar el Asistente de documentos públicos, aceptar la política o enviar información por los
            canales habilitados, el usuario manifiesta haber leído y aceptado esta política de tratamiento de
            datos personales y privacidad.
          </p>
        </Section>

        <Section id="revision" number="24" title="Nota de revisión jurídica">
          <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
            <p className="text-sm leading-7 text-amber-50">
              Nota: Esta política ha sido preparada como documento base para informar a los usuarios sobre el
              tratamiento de datos personales. Su contenido debe ser revisado y validado por el responsable
              jurídico o administrativo de la entidad contratante, la organización beneficiaria o quien
              corresponda antes de su publicación definitiva.
            </p>
          </div>
        </Section>

        <section className={cardClassName}>
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-300">Pendientes</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Datos por confirmar antes de publicar</h2>
            </div>
            <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-amber-100">
              Revisión requerida
            </span>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {pendingPlaceholders.map((placeholder) => (
              <div
                key={placeholder}
                className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 font-mono text-sm text-slate-200"
              >
                {placeholder}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
