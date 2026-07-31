export const metadata = {
  title: "Política de Privacidad | fmoutinhoDev",
  description: "Política de Privacidad de fmoutinhoDev. Información sobre el tratamiento de datos personales.",
};

export default function PrivacidadPage() {
  return (
    <div className="container py-8 max-w-4xl">
      <article className="prose prose-gray dark:prose-invert max-w-none">
        <h1>Política de Privacidad</h1>
        <p className="text-muted-foreground">
          Última actualización: {new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <h2>1. Introducción</h2>
        <p>
          Bienvenido a fmoutinhoDev. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos 
          su información personal cuando utiliza nuestro sitio web y servicios.
        </p>

        <h2>2. Información que Recopilamos</h2>
        <p>Podemos recopilar los siguientes tipos de información:</p>
        <ul>
          <li>
            <strong>Información proporcionada voluntariamente:</strong> Nombre, correo electrónico, 
            y otra información que usted nos proporcione al contactarnos o suscribirse a nuestros servicios.
          </li>
          <li>
            <strong>Información recopilada automáticamente:</strong> Dirección IP, tipo de navegador, 
            páginas visitadas, tiempo de permanencia, y otros datos de navegación a través de cookies 
            y tecnologías similares.
          </li>
        </ul>

        <h2>3. Uso de la Información</h2>
        <p>Utilizamos la información recopilada para:</p>
        <ul>
          <li>Proporcionar y mejorar nuestros servicios</li>
          <li>Personalizar su experiencia en el sitio</li>
          <li>Enviar comunicaciones relacionadas con nuestros servicios (si ha dado su consentimiento)</li>
          <li>Analizar el uso del sitio para optimizar el contenido</li>
          <li>Mostrar anuncios personalizados a través de Meta Ads y Google AdSense</li>
        </ul>

        <h2>4. Cookies y Tecnologías de Seguimiento</h2>
        <p>
          Utilizamos cookies y tecnologías similares para recopilar información sobre cómo utiliza 
          nuestro sitio. Esto incluye:
        </p>
        <ul>
          <li>
            <strong>Meta Pixel:</strong> Utilizado para rastrear conversiones y optimizar campañas 
            publicitarias en plataformas de Meta.
          </li>
          <li>
            <strong>Google Analytics:</strong> Utilizado para analizar el tráfico del sitio y 
            el comportamiento de los usuarios.
          </li>
          <li>
            <strong>Google AdSense:</strong> Utilizado para mostrar anuncios personalizados.
          </li>
        </ul>
        <p>
          Puede controlar el uso de cookies a través de la configuración de su navegador.
        </p>

        <h2>5. Publicidad Personalizada</h2>
        <p>
          Trabajamos con Meta (Facebook/Instagram) y Google para mostrar anuncios personalizados. 
          Estos terceros pueden utilizar información sobre sus visitas a este y otros sitios para 
          proporcionar anuncios relevantes.
        </p>
        <p>
          Puede optar por no recibir publicidad personalizada visitando:
        </p>
        <ul>
          <li>
            <a href="https://www.facebook.com/settings/?tab=ads" target="_blank" rel="noopener noreferrer">
              Configuración de anuncios de Facebook
            </a>
          </li>
          <li>
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Configuración de anuncios de Google
            </a>
          </li>
        </ul>

        <h2>6. Compartición de Información</h2>
        <p>
          No vendemos ni alquilamos su información personal a terceros. Podemos compartir información con:
        </p>
        <ul>
          <li>Proveedores de servicios que nos ayudan a operar el sitio</li>
          <li>Plataformas publicitarias para mostrar anuncios relevantes</li>
          <li>Autoridades legales cuando sea requerido por ley</li>
        </ul>

        <h2>7. Seguridad de Datos</h2>
        <p>
          Implementamos medidas de seguridad técnicas y organizativas para proteger su información 
          personal contra acceso no autorizado, alteración, divulgación o destrucción.
        </p>

        <h2>8. Sus Derechos</h2>
        <p>Usted tiene derecho a:</p>
        <ul>
          <li>Acceder a sus datos personales</li>
          <li>Solicitar la corrección de datos inexactos</li>
          <li>Solicitar la eliminación de sus datos</li>
          <li>Oponerse al procesamiento de sus datos</li>
          <li>Retirar su consentimiento en cualquier momento</li>
        </ul>
        <p>
          Para ejercer estos derechos, contáctenos en:{" "}
          <a href="mailto:privacidad@fmoutinho.dev">privacidad@fmoutinho.dev</a>
        </p>

        <h2>9. Menores de Edad</h2>
        <p>
          Nuestro sitio no está dirigido a menores de 18 años. No recopilamos intencionalmente 
          información de menores.
        </p>

        <h2>10. Cambios en esta Política</h2>
        <p>
          Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos sobre 
          cambios significativos publicando la nueva política en esta página.
        </p>

        <h2>11. Contacto</h2>
        <p>
          Si tiene preguntas sobre esta Política de Privacidad, contáctenos:
        </p>
        <ul>
          <li>Email: <a href="mailto:privacidad@fmoutinho.dev">privacidad@fmoutinho.dev</a></li>
          <li>Sitio web: <a href="https://fmoutinho.dev">fmoutinho.dev</a></li>
        </ul>
      </article>
    </div>
  );
}
