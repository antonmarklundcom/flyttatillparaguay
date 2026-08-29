import Image from "next/image";

/**
 * Bildslot. Fas sonnet-4 genererar och lägger in de riktiga bilderna via
 * `higgsfield-web-imagery`; fram till dess ritas en tydlig platshållare med
 * den art direction som ska genereras, så att inget slot glöms bort.
 *
 * `src` = null betyder "ännu inte genererad" — inte "bild saknas av misstag".
 */
export function ImageSlot({
  src,
  alt,
  brief,
  priority = false,
  aspect = "4 / 3",
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  src?: string | null;
  alt: string;
  /** Art direction för fas sonnet-4. */
  brief: string;
  priority?: boolean;
  aspect?: string;
  className?: string;
  sizes?: string;
}) {
  if (src) {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-xl bg-sand-200 ${className}`}
        style={{ aspectRatio: aspect }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      data-image-slot="pending"
      className={`relative flex w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-sand-400 bg-gradient-to-br from-sand-200 via-sand-100 to-clay-50 ${className}`}
      style={{ aspectRatio: aspect }}
      role="img"
      aria-label={alt}
    >
      <p className="max-w-[28ch] px-6 text-center text-xs leading-relaxed text-ink-400">
        {brief}
      </p>
    </div>
  );
}
