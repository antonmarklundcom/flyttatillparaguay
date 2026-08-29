/** Strukturerad data. Renderas i sidkroppen, inte i <head>. */
export function JsonLd({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Schemat byggs i vår egen kod, aldrig från användarinput.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
