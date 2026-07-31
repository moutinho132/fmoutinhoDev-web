export const metadata = {
  title: "Términos de Servicio | fmoutinhoDev",
  description: "Términos de Servicio de fmoutinhoDev. Condiciones de uso del sitio web y servicios.",
};

export default function TerminosPage() {
  return (
    <div className="container py-8 max-w-4xl">
      <article className="prose prose-gray dark:prose-invert max-w-none">
        <h1>Términos de Servicio</h1>
        <p className="text-muted-foreground">
          Última actualización: {new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <h2>1. Aceptación de los Términos</h2>
        <p>
          Al acceder y utilizar el sitio web fmoutinhoDev, usted acepta estar sujeto a estos 
          Términos de Servicio. Si no está de acuerdo con alguna parte de estos términos, 
          no debe utilizar nuestro sitio.
        </p>

        <h2>2. Descripción del Servicio</h2>
        <p>
          fmoutinhoDev es una plataforma educativa que ofrece:
        </p>
        <ul>
          <li>Portafolio profesional y currículum de Fernando Moutinho</li>
          <li>Carrusel de videos educativos de YouTube</li>
          <li>Playgrounds interactivos de SQL, JavaScript y Git</li>
          <li>Catálogo de cursos y recursos educativos</li>
        </ul>

        <h2>3. Uso Aceptable</h2>
        <p>Usted se compromete a:</p>
        <ul>
          <li>Utilizar el sitio solo con fines legales y educativos</li>
          <li>No intentar acceder no autorizadamente a sistemas o datos</li>
          <li>No interferir con el funcionamiento del sitio</li>
          <li>No utilizar los playgrounds para código malicioso</li>
          <li>Respetar los derechos de propiedad intelectual</li>
        </ul>

        <h2>4. Playgrounds Interactivos</h2>
        <p>
          Los playgrounds de código (SQL, JavaScript, Git) se proporcionan con fines educativos:
        </p>
        <ul>
          <li>
            <strong>Ejecución local:</strong> Todo el código se ejecuta en su navegador. 
            No enviamos su código a servidores externos.
          </li>
          <li>
            <strong>Sin garantía:</strong> Los playgrounds se proporcionan &quot;tal cual&quot; sin garantía 
            de funcionamiento correcto.
          </li>
          <li>
            <strong>Uso responsable:</strong> No ejecute código que pueda causar daño a su 
            sistema o navegador.
          </li>
        </ul>

        <h2>5. Propiedad Intelectual</h2>
        <p>
          Todo el contenido del sitio, incluyendo pero no limitado a textos, gráficos, logos, 
          imágenes, videos y código fuente, es propiedad de fmoutinhoDev o sus licenciantes 
          y está protegido por leyes de propiedad intelectual.
        </p>
        <p>
          El código de ejemplo en los playgrounds puede ser utilizado libremente con fines 
          educativos, pero no puede ser redistribuido comercialmente sin autorización.
        </p>

        <h2>6. Enlaces a Terceros</h2>
        <p>
          Nuestro sitio puede contener enlaces a sitios de terceros (YouTube, GitHub, LinkedIn, 
          etc.). No somos responsables del contenido o prácticas de privacidad de estos sitios.
        </p>

        <h2>7. Publicidad</h2>
        <p>
          Mostramos anuncios a través de Meta Ads y Google AdSense. Estos servicios pueden 
          utilizar cookies para mostrar anuncios personalizados. Consulte nuestra 
          <a href="/privacidad">Política de Privacidad</a> para más información.
        </p>

        <h2>8. Descarga de CV</h2>
        <p>
          El currículum disponible para descarga es para uso informativo personal. No puede 
          ser utilizado para fines comerciales, redistribuido o presentado como propio.
        </p>

        <h2>9. Exclusión de Garantías</h2>
        <p>
          EL SITIO Y LOS SERVICIOS SE PROPORCIONAN &quot;TAL CUAL&quot; SIN GARANTÍAS DE NINGÚN TIPO, 
          EXPRESAS O IMPLÍCITAS, INCLUYENDO PERO NO LIMITADO A GARANTÍAS DE COMERCIABILIDAD, 
          IDONEIDAD PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN.
        </p>

        <h2>10. Limitación de Responsabilidad</h2>
        <p>
          EN NINGÚN CASO FMOUTINHODEV SERÁ RESPONSABLE POR DAÑOS DIRECTOS, INDIRECTOS, 
          INCIDENTALES, ESPECIALES, CONSECUENTES O PUNITIVOS DERIVADOS DEL USO O LA 
          IMPOSIBILIDAD DE USAR EL SITIO.
        </p>

        <h2>11. Modificaciones</h2>
        <p>
          Nos reservamos el derecho de modificar estos Términos en cualquier momento. 
          Los cambios serán efectivos inmediatamente después de su publicación. El uso 
          continuado del sitio constituye la aceptación de los términos modificados.
        </p>

        <h2>12. Terminación</h2>
        <p>
          Nos reservamos el derecho de bloquear o terminar el acceso al sitio a cualquier 
          usuario que viole estos Términos, sin previo aviso.
        </p>

        <h2>13. Ley Aplicable</h2>
        <p>
          Estos Términos se rigen por las leyes de la República de Chile. Cualquier disputa 
          será resuelta en los tribunales de Santiago de Chile.
        </p>

        <h2>14. Contacto</h2>
        <p>
          Para preguntas sobre estos Términos, contáctenos:
        </p>
        <ul>
          <li>Email: <a href="mailto:legal@fmoutinho.dev">legal@fmoutinho.dev</a></li>
          <li>Sitio web: <a href="https://fmoutinho.dev">fmoutinho.dev</a></li>
        </ul>
      </article>
    </div>
  );
}
